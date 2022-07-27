import { Sheet } from "../stores/sheets";
import { array, object, ValidationError } from "yup";
import { validateSheet } from "./validate-sheet";
import { isNotNull } from "./is-not-null";

const shareCodeSchema = object({
  sheets: array(object()).required(),
});

export async function getShareCode(sheets: Sheet[]) {
  const stringified = JSON.stringify({ sheets });
  return await compressToBase64(stringified);
}

export async function parseShareCode(code: string): Promise<Sheet[] | null> {
  try {
    const parsed: unknown = JSON.parse(await decompressBase64(code));
    const validated = shareCodeSchema.validateSync(parsed);

    return validated.sheets
      .map((sheet) => validateSheet(sheet))
      .filter(isNotNull);
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      error instanceof ValidationError ||
      (error instanceof DOMException && error.name === "InvalidCharacterError")
    ) {
      return null;
    }

    throw error;
  }
}

async function compressToBase64(str: string) {
  const pako = await import("pako");
  const deflated = pako.deflate(str);
  return btoa(stringFromBuffer(deflated));
}

async function decompressBase64(base64: string) {
  const pako = await import("pako");
  const decoded = atob(base64);
  const inflated = pako.inflate(bufferFromString(decoded));
  return stringFromBuffer(inflated);
}

function bufferFromString(str: string) {
  const buffer = new Uint8Array(str.length);
  for (let i = 0; i < buffer.byteLength; i++) {
    buffer[i] = str.charCodeAt(i);
  }
  return buffer;
}

function stringFromBuffer(buffer: Uint8Array) {
  let string = "";
  for (let i = 0; i < buffer.byteLength; i++) {
    string += String.fromCharCode(buffer[i]);
  }
  return string;
}
