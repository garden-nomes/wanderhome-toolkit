import { defineStore } from "pinia";
import sheetDefinitions, {
  SheetFields,
  SheetType,
} from "../lib/sheet-definitions";
import uid, { UID } from "../lib/uid";

export interface Sheet<T extends SheetType> {
  id: UID;
  created: string;
  type: T;
  fields: SheetFields<T>;
}

export const useSheetsStore = defineStore("game", {
  state: () => ({
    sheets: {} as { [id: UID]: Sheet<any> },
  }),
  actions: {
    getSheet<T extends SheetType = any>(id: UID, type?: T): Sheet<T> {
      const sheet = this.sheets[id];

      if (!sheet || (type && sheet.type !== type)) {
        throw new Error(`Sheet not found: ${id}`);
      }

      return sheet;
    },
    createSheet<T extends SheetType>(type: T) {
      const sheet: Sheet<T> = {
        id: uid(),
        created: new Date().toISOString(),
        type,
        fields: sheetDefinitions[type].defaultValues() as SheetFields<T>,
      };

      this.sheets[sheet.id] = sheet;
      return sheet;
    },
    removeSheet(id: UID) {
      if (!this.sheets[id]) {
        throw new Error(`Sheet not found: ${id}`);
      }

      delete this.sheets[id];
    },
  },
});
