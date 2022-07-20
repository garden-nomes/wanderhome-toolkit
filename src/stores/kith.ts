import { defineStore } from "pinia";

export interface Kith {
  uid: string;
  name: string;
  pronouns: string;
  form: string;
  traits: string[];
  canAlways: string[];
  relationships: string[];
  details: string[];
  notes: string[];
}

export const useKithStore = defineStore("kith", {
  state: () => ({ kith: [] as Kith[] }),
  getters: {
    getOrThrow: (state) => (id: string) => {
      const kith = state.kith.find((kith) => kith.uid === id);
      if (!kith) throw new Error(`Invalid kith id: ${id}`);
      return kith;
    },
  },
  actions: {
    createKith() {
      const kith = {
        uid: Math.random().toString(36).slice(2),
        name: "",
        pronouns: "",
        form: "",
        traits: [],
        canAlways: [],
        relationships: [],
        details: [],
        notes: [],
      };

      this.kith.push(kith);
      return kith;
    },
  },
});
