import {
  PDFArray,
  PDFDocument,
  PDFName,
  PDFTextField,
  StandardFonts,
} from "pdf-lib";
import { FieldAppearanceOptions } from "pdf-lib/cjs/api/form/PDFField";
import sheetsPdf from "../assets/sheets_form.pdf";
import { openPdf } from "./build-pdf";

function saveByteArray(filename: string, bytes: Uint8Array) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export const runTest = async () => {
  const sourceBytes = await fetch(sheetsPdf).then((res) => res.arrayBuffer());
  const sourceDoc = await PDFDocument.load(sourceBytes);

  const font = sourceDoc.embedStandardFont(StandardFonts.TimesRoman);

  const form = sourceDoc.getForm();

  for (const field of form.getFields()) {
    if (field instanceof PDFTextField) {
      field.updateAppearances(font);
      field.setFontSize(10);
      field.setText(field.getName());
      field.updateAppearances(font);
    }
  }

  // openPdf(sourceDoc);
};
