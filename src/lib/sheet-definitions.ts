export type SheetType = keyof typeof sheetTypes;
export type SheetFields<T extends SheetType> = ReturnType<
  typeof sheetTypes[T]["defaultValues"]
>;

function defineSheetType<T>(sheet: {
  columns: string;
  defaultValues: () => T;
}) {
  return sheet;
}

const sheetTypes = {
  character: defineSheetType({
    columns: "col-12 col-lg-12 col-xxxl-8",
    defaultValues: () => ({
      name: "",
      pronouns: "",
      playbook: "",
      animalForm: "",
      playerName: "",
      playerPronouns: "",
      care: "",
      personality: "",
      look: "",
      prompts: [] as string[],
      advancements: [] as string[],
      notes: [] as string[],
      canAlways: [] as string[],
    }),
  }),
  kith: defineSheetType({
    columns: "col-12 col-lg-6 col-xxxl-4",
    defaultValues: () => ({
      name: "",
      pronouns: "",
      form: "",
      traits: [] as string[],
      canAlways: [] as string[],
      relationships: [] as string[],
      details: [] as string[],
      notes: [] as string[],
    }),
  }),
  place: defineSheetType({
    columns: "col-12 col-lg-12 col-xxxl-8",
    defaultValues: () => ({
      name: "",
      animalFolk: "",
      smallAndForgottenGods: "",
      natures: [] as string[],
      aestheticElements: [] as string[],
      folklore: [] as string[],
      notes: [] as string[],
    }),
  }),
  season: defineSheetType({
    columns: "col-12 col-lg-6 col-xxxl-4",
    defaultValues: () => ({
      name: "",
      year: "",
      firstMonthName: "",
      firstMonthSpentAt: "",
      firstMonthPresent: [] as string[],
      firstMonthSigns: [] as string[],
      firstMonthNotes: [] as string[],
      secondMonthName: "",
      secondMonthSpentAt: "",
      secondMonthPresent: [] as string[],
      secondMonthSigns: [] as string[],
      secondMonthNotes: [] as string[],
      holiday: "",
      holidayCelebratedAt: "",
      holidayTraditions: [] as string[],
      holidayHowCelebrated: "",
      holidayCan: [] as string[],
    }),
  }),
};

export default sheetTypes;
