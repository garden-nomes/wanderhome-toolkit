import { Sheet } from "../stores/sheets";
import { name, version } from "../../package.json";

const key = `${name}@${version}`;

export async function getShareCode(sheets: Sheet[]) {
  const stringified = JSON.stringify({ key, sheets });
  return await compressToBase64(stringified);
}

export async function parseShareCode(code: string): Promise<Sheet[] | null> {
  try {
    const parsed = JSON.parse(await decompressBase64(code));

    if ("key" in parsed && parsed.key === key) {
      return parsed.sheets as Sheet[];
    }
  } catch (err) {
    console.error((err instanceof Error && err.stack) || err);
  } // eslint-disable-line no-empty

  return null;
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
