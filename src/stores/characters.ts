import { defineStore } from "pinia";

export interface Character {
  id: string;
  name: string;
  pronouns: string;
  playbook: string;
  animalForm: string;
  playerName: string;
  youCanAlways: string[];
  look: string;
  personality: string;
  care: string;
}

export const useCharacterStore = defineStore("characters", {
  state: () => ({ characters: [] as Character[] }),
  actions: {
    createNew(values: Partial<Character> = {}) {
      const character: Character = {
        id: Math.random().toString(16).slice(2),
        name: "",
        pronouns: "",
        playbook: "",
        animalForm: "",
        playerName: "",
        youCanAlways: [],
        look: "",
        personality: "",
        care: "",
        ...values,
      };

      this.characters.push(character);
      return character;
    },

    update(character: Character) {
      const index = this.characters.findIndex((c) => c.id === character.id);

      if (index < 0) {
        throw new Error(`Invalid character id: ${character.id}`);
      }

      this.characters[index] = character;
    },

    seed() {
      this.createNew({
        name: "Aspen",
        playbook: "The Moth Tender",
        pronouns: "They/Them",
        animalForm: "Bat",
        playerName: "Naomi",
        youCanAlways: [
          "Follow the moths.",
          "Fidget.",
          "Write something down on a piece of paper.",
          "Tell everyone what phase the moon is in right now.",
          "Ask: “Have you heard the news?”",
          "Say: “I have a letter for you!” They get a token if they accept the letter.",
        ],
        look: "A tweed vest, ink-stained gloves, and a map of local moth towers",
      });

      this.createNew({
        name: "Gertrude",
        playbook: "The Guardian",
        pronouns: "She/Her",
        animalForm: "Bear",
        playerName: "Naomi",
        youCanAlways: [
          "Follow the moths.",
          "Fidget.",
          "Write something down on a piece of paper.",
          "Tell everyone what phase the moon is in right now.",
          "Ask: “Have you heard the news?”",
          "Say: “I have a letter for you!” They get a token if they accept the letter.",
        ],
        look: "A tweed vest, ink-stained gloves, and a map of local moth towers",
      });

      // this.createNew({
      //   name: "Derkin",
      //   playbook: "The Ragamuffin",
      // });
    },
  },
  getters: {
    getById: (store) => (id: string) => {
      const character = store.characters.find((c) => c.id === id);

      if (!character) {
        throw new Error(`invalid id: ${id}`);
      }

      return character;
    },
  },
});
