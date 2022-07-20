import { defineStore } from "pinia";

export interface Place {
  uid: string;
  name: string;
  natures: string[];
  aestheticElements: string[];
  folklore: string[];
  notes: string[];
}

export const usePlacesStore = defineStore("places", {
  state: () => ({ places: [] as Place[] }),
  getters: {
    getOrThrow: (state) => (id: string) => {
      const place = state.places.find((place) => place.uid === id);
      if (!place) throw new Error(`Invalid place id: ${id}`);
      return place;
    },
  },
  actions: {
    createPlace() {
      const place = {
        uid: Math.random().toString(36).slice(2),
        name: "",
        natures: [],
        aestheticElements: [],
        folklore: [],
        notes: [],
      };

      this.places.push(place);
      return place;
    },
  },
});
