import { range } from "lodash-es";
import { SheetType, SheetFields } from "./sheet-definitions";

type FieldMappings<T extends SheetType> = {
  page: number;
  fields: { [K in keyof SheetFields<T>]: string | string[] | null };
};

export const fieldMappings: { [T in SheetType]?: FieldMappings<T> } = {
  character: {
    page: 0,
    fields: {
      name: "Character Name",
      pronouns: "Pronouns",
      playbook: "Playbook",
      animalForm: "Animal Form",
      playerName: "Player Name  Pronouns",
      playerPronouns: "Player Name  Pronouns",
      care: range(1, 3).map((i) => `You are alive Describe your care ${i}`),
      personality: range(1, 5).map((i) => `Describe your personality ${i}`),
      look: range(1, 5).map((i) => `Describe your look ${i}`),
      prompts: "Prompts and Choices",
      advancements: "Advancements",
      notes: null,
      canAlways: [
        "fill_7",
        "fill_9",
        "fill_11",
        "fill_12",
        "fill_14",
        "fill_15",
        "fill_17",
        "fill_19",
      ],
    },
  },
  place: {
    page: 1,
    fields: {
      name: "Place Name",
      animalFolk: range(1, 3).map((i) => `AnimalFolk ${i}`),
      smallAndForgottenGods: "undefined_2",
      natures: ["Nature", "Nature_2", "Nature_3"],
      aestheticElements: [
        "Aesthetic Elements",
        "Aesthetic Elements_2",
        "Aesthetic Elements_3",
        "Aesthetic Elements_4",
      ],
      folklore: range(1, 5).map((i) => `Folklore ${i}`),
      notes: ["Maps and Notes"],
    },
  },
  kith: {
    page: 2,
    fields: {
      name: "Name",
      pronouns: "Pronouns_2",
      form: "Kith 2",
      traits: range(1, 5).map((i) => `Traits ${i}`),
      canAlways: [
        "fill_7_2",
        "fill_9_2",
        "fill_11_2",
        "fill_11_3",
        "fill_13",
        "fill_15_3",
      ],
      relationships: range(1, 5).map((i) => `Key Relationships ${i}`),
      details: range(1, 10).map((i) => `Details ${i}`),
      notes: "Notes  Portrait",
    },
  },
  season: {
    page: 3,
    fields: {
      name: "Season_2",
      year: "Year",
      firstMonthName: "Season",
      firstMonthSpentAt: null,
      firstMonthPresent: range(1, 6).map((i) => `What is present here ${i}}`),
      firstMonthSigns: range(1, 6).map((i) => `Signs of the Month ${i}}`),
      firstMonthNotes: "Question and Notes",
      secondMonthName: "Month",
      secondMonthSpentAt: "Spent at the Place",
      secondMonthPresent: range(1, 6).map(
        (i) => `What is present here ${i}}_2`
      ),
      secondMonthSigns: range(1, 6).map((i) => `Signs of the Month ${i}}_2`),
      secondMonthNotes: "Question and Notes",
      holiday: "Holiday",
      holidayCelebratedAt: "Celebrated at the Place",
      holidayTraditions: range(1, 5).map((i) => `Holiday Traditions ${i}`),
      holidayHowCelebrated: range(1, 4).map(
        (i) => `How the holiday is celebrated ${i}`
      ),
      holidayCan: ["Celebrated at the Place", "fill_63", "fill_67", "fill_71"],
    },
  },
};
