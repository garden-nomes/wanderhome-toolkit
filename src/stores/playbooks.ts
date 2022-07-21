import { defineStore } from "pinia";

export interface Playbook {
  uid: string;
  name: string;
  pronouns: string;
  playbook: string;
  animalForm: string;
  playerName: string;
  playerPronouns: string;
  care: string;
  personality: string;
  look: string;
  canAlways: string[];
  prompts: string[];
  advancements: string[];
  notes: string[];
}

export const usePlaybooksStore = defineStore("playbooks", {
  state: () => ({ playbooks: [] as Playbook[] }),
  getters: {
    getOrThrow: (state) => (id: string) => {
      const playbook = state.playbooks.find((playbook) => playbook.uid === id);
      if (!playbook) throw new Error(`Invalid playbook id: ${id}`);
      return playbook;
    },
  },
  actions: {
    createPlaybook() {
      const playbook: Playbook = {
        uid: Math.random().toString(36).slice(2),
        name: "",
        pronouns: "",
        playbook: "",
        animalForm: "",
        playerName: "",
        playerPronouns: "",
        care: "",
        personality: "",
        look: "",
        prompts: [],
        advancements: [],
        notes: [],
        canAlways: [],
      };

      this.playbooks.push(playbook);
      return playbook;
    },
  },
});
