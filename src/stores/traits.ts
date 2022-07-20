import { categories } from "../json/traits.json";
import { defineStore } from "pinia";

export type TraitCategory = typeof categories[number];
export type Trait = typeof categories[number]["traits"][number];
export type TraitId = Trait["name"];

export const useTraitStore = defineStore("traits", {
  state: () => ({
    categories,
    traits: categories.flatMap((category) => category.traits),
  }),
  getters: {
    getOrThrow: (state) => (traitName: string) => {
      const trait = state.traits.find((t) => t.name === traitName);

      if (!trait) {
        throw new Error(`Invalid trait name: ${traitName}`);
      }

      return trait;
    },
  },
});
