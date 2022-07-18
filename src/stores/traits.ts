import { categories } from "../json/traits.json";
import { defineStore } from "pinia";

export type TraitCategory = typeof categories[number];
export type Trait = typeof categories[number]["traits"][number];

export const useTraitStore = defineStore("traits", {
  state: () => ({
    categories,
    traits: categories.flatMap((category) => category.traits),
  }),
});
