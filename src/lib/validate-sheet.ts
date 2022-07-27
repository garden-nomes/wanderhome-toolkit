import { keys } from "lodash-es";
import { object, string, boolean, ValidationError } from "yup";
import { Sheet } from "../stores/sheets";
import sheetDefinitions, { SheetType } from "./sheet-definitions";
import uid from "./uid";

function isSheetType(type: unknown): type is SheetType {
  return typeof type === "string" && keys(sheetDefinitions).includes(type);
}

export const sheetBaseSchema = object({
  id: string().default(() => uid()),
  created: string().default(() => new Date().toISOString()),
  isOnTable: boolean().default(true),
  type: string().required(),
  fields: object().unknown().required(),
});

export function validateSheet(sheet: unknown): Sheet | null {
  try {
    const validatedSheet = sheetBaseSchema.validateSync(sheet, {});

    if (!isSheetType(validatedSheet.type)) {
      return null;
    }

    const validatedFields = sheetDefinitions[
      validatedSheet.type
    ].schema.validateSync(validatedSheet.fields);

    return {
      ...validatedSheet,
      type: validatedSheet.type,
      fields: validatedFields,
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return null;
    }

    throw error;
  }
}
