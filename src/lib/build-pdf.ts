import { keys, orderBy, range } from "lodash-es";
import {
  PDFArray,
  PDFDocument,
  PDFField,
  PDFFont,
  PDFForm,
  PDFName,
  PDFTextField,
  TextAlignment,
} from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { Sheet } from "../stores/sheets";
import { SheetType } from "./sheet-definitions";
import sheetsPdf from "../assets/sheets_form.pdf";
import { fieldMappings } from "./pdf-field-mappings";
import joanFontSrc from "../assets/Joan-Regular.ttf";

function getRect(field: PDFField) {
  const rect = field.acroField.dict.lookup(PDFName.of("Rect"));
  if (rect instanceof PDFArray) {
    return rect.asRectangle();
  }

  throw new Error("No rectangle found for field: " + field.getName());
}

function breakIntoLines(
  text: string,
  font: PDFFont,
  width: number,
  size: number
) {
  if (font.widthOfTextAtSize(text, size) <= width) {
    return [text];
  }

  const lines: string[] = [];
  const line: string[] = [];
  for (const word of text.split(" ")) {
    if (font.widthOfTextAtSize([...line, word].join(" "), size) > width) {
      if (line.length > 0) {
        lines.push(line.join(" "));
        line.length = 0;
        line.push(word);
      } else {
        lines.push(word);
      }
    } else {
      line.push(word);
    }
  }

  if (line.length > 0) {
    lines.push(line.join(" "));
  }

  return lines;
}

function getOptimalSize(
  text: string,
  font: PDFFont,
  width: number,
  minSize: number,
  maxSize: number
) {
  if (breakIntoLines(text, font, width, maxSize).length === 1) {
    return maxSize;
  }

  const sizes = range(minSize, maxSize);
  const optimal = orderBy(
    sizes,
    [(s) => breakIntoLines(text, font, width, s).length, (s) => s],
    ["asc", "desc"]
  )[0];

  return optimal;
}

function setFieldResizing(
  field: PDFTextField,
  text: string,
  font: PDFFont,
  maxSize: number,
  minSize: number
) {
  let size = maxSize;

  const fieldWidth = getRect(field).width;
  while (font.widthOfTextAtSize(text, size) > fieldWidth && size > minSize) {
    size--;
  }

  field.setFontSize(size);
  field.setText(text);
}

function mapTextBulletsToFields(
  items: string[],
  fields: PDFTextField[],
  font: PDFFont,
  minSize: number,
  maxSize: number
) {
  let fieldIndex = 0;

  for (const item of items) {
    const width = getRect(fields[fieldIndex]).width;
    const lines = breakIntoLines(item, font, width, minSize);

    for (const line of lines) {
      fields[fieldIndex].setFontSize(minSize);
      fields[fieldIndex].setAlignment(
        line === lines[0] ? TextAlignment.Left : TextAlignment.Right
      );
      fields[fieldIndex].setText(line);

      fieldIndex++;

      if (fieldIndex >= fields.length) {
        return;
      }
    }
  }
}

function setField(
  form: PDFForm,
  field: string | string[],
  text: string | string[],
  font: PDFFont,
  maxSize: number,
  minSize: number
) {
  if (typeof field === "string" && typeof text === "string") {
    setFieldResizing(form.getTextField(field), text, font, maxSize, minSize);
  } else if (typeof field === "string" && typeof text === "object") {
    form
      .getTextField(field)
      .setText(
        text
          .map((item) =>
            breakIntoLines(
              item,
              font,
              getRect(form.getTextField(field)).width,
              maxSize
            )
          )
          .join("\n\n")
      );
  } else if (typeof field === "object" && typeof text === "object") {
    mapTextBulletsToFields(
      text,
      field.map((f) => form.getTextField(f)),
      font,
      minSize,
      maxSize
    );
  } else if (typeof field === "object" && typeof text === "string") {
    form.getTextField(field[0]).setText(text);
  }
}

export default async function buildPdf<T extends SheetType>(sheet: Sheet<T>) {
  const pdfFields = fieldMappings[sheet.type];

  if (!pdfFields) {
    return;
  }

  const sourceBytes = await fetch(sheetsPdf).then((res) => res.arrayBuffer());
  const sourceDoc = await PDFDocument.load(sourceBytes);

  sourceDoc.registerFontkit(fontkit);

  const fontBytes = await fetch(joanFontSrc).then((res) => res.arrayBuffer());
  const font = await sourceDoc.embedFont(fontBytes);
  const form = sourceDoc.getForm();

  for (const field of form.getFields()) {
    if (field instanceof PDFTextField) {
      field.updateAppearances(font);
      field.setFontSize(10);
    }
  }

  for (const key of keys(sheet.fields) as (keyof typeof sheet.fields)[]) {
    const field = pdfFields.fields[key];

    if (field && sheet.fields[key]) {
      const value: any = sheet.fields[key];
      setField(form, field, value, font, 10, 8);
    }
  }

  for (const field of form.getFields()) {
    if (field instanceof PDFTextField) {
      field.updateAppearances(font);
    }
  }

  const pdfDoc = await PDFDocument.create();
  const [page] = await pdfDoc.copyPages(sourceDoc, [pdfFields.page]);
  pdfDoc.addPage(page);

  await openPdf(pdfDoc);
  return pdfDoc;
}

export async function openPdf(doc: PDFDocument) {
  const bytes = await doc.save();
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url);
}
