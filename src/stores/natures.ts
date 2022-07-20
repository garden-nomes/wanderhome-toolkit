import { categories } from "../json/natures.json";
import { defineStore } from "pinia";

export type NatureCategory = typeof categories[number];
export type Nature = typeof categories[number]["natures"][number];

export const useNaturesStore = defineStore("natures", {
  state: () => ({
    categories,
    natures: categories.flatMap((category) => category.natures),
  }),
  getters: {
    getOrThrow: (state) => (natureName: string) => {
      const nature = state.natures.find((t) => t.name === natureName);

      if (!nature) {
        throw new Error(`Invalid nature name: ${natureName}`);
      }

      return nature;
    },
  },
});
