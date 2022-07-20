export type UID = string;

export default function uid(): UID {
  return Math.random().toString(36).slice(2);
}
