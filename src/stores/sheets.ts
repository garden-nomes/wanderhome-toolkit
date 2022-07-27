import { values } from "lodash-es";
import { defineStore } from "pinia";
import sheetDefinitions, {
  SheetFields,
  SheetType,
} from "../lib/sheet-definitions";
import uid, { UID } from "../lib/uid";
import { isNotNull } from "../lib/is-not-null";

export interface Sheet<T extends SheetType = SheetType> {
  id: UID;
  created: string;
  isOnTable: boolean;
  type: T;
  fields: SheetFields<T>;
}

export const useSheetsStore = defineStore("sheets", {
  state: () => ({
    sheets: {} as { [id: UID]: Sheet | null },
  }),
  actions: {
    getSheet<T extends SheetType = SheetType>(id: UID, type?: T): Sheet<T> {
      const sheet = this.sheets[id];

      if (!sheet) {
        throw new Error(`Sheet not found: ${id}`);
      }

      if (type && sheet.type !== type) {
        throw new Error(
          `Unexpected sheet type for ${id}: ${sheet.type} (expected: ${type})`
        );
      }

      return sheet as Sheet<T>;
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
        fields: sheetDefinitions[type].schema.getDefault(),
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
