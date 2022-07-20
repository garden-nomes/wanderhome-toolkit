export type UID = string;

function hash(text: string) {
  let hash = 5381;
  let index = text.length;

  while (index) {
    hash = (hash * 33) ^ text.charCodeAt(--index);
  }

  return (hash >>> 0).toString(36);
}

export default function uid(from?: string): UID {
  return from ? hash(from) : Math.random().toString(36).slice(2);
}
