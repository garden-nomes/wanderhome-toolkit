import { values } from "lodash-es";
import { defineStore } from "pinia";
import sheetDefinitions, {
  SheetFields,
  SheetType,
} from "../lib/sheet-definitions";
import uid, { UID } from "../lib/uid";

export interface Sheet<T extends SheetType = SheetType> {
  id: UID;
  created: string;
  isOnTable: boolean;
  type: T;
  fields: SheetFields<T>;
}

function isNotNull<T>(x: T | null): x is T {
  return x !== null;
}

export const useSheetsStore = defineStore("sheets", {
  state: () => ({
    id: uid(),
    sheets: {} as { [id: UID]: Sheet | null },
  }),
  actions: {
    getSheet<T extends SheetType = any>(id: UID, type?: T): Sheet<T> {
      const sheet = this.sheets[id];

      if (!sheet || (type && sheet.type !== type)) {
        throw new Error(`Sheet not found: ${id}`);
      }

      return sheet;
    },
    getSheets(filters: { type?: string; isOnTable?: boolean }) {
      return values(this.sheets)
        .filter(isNotNull)
        .filter((s) => {
          if (filters.type && s.type !== filters.type) {
            return false;
          }

          if (
            typeof filters.isOnTable !== "undefined" &&
            s.isOnTable !== filters.isOnTable
          ) {
            return false;
          }

          return true;
        });
    },
    createSheet<T extends SheetType>(type: T) {
      const sheet: Sheet<T> = {
        id: uid(),
        created: new Date().toISOString(),
        isOnTable: true,
        type,
        fields: sheetDefinitions[type].defaultValues() as SheetFields<T>,
      };

      this.sheets[sheet.id] = sheet;
      return sheet;
    },
    addSheets(sheets: Sheet[]) {
      for (const sheet of sheets) {
        this.sheets[sheet.id] = sheet;
      }
    },
    removeSheet(id: UID) {
      if (!this.sheets[id]) {
        throw new Error(`Sheet not found: ${id}`);
      }

      this.sheets[id] = null;
    },
  },
});
