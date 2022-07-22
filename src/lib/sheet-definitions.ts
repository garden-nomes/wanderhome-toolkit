export type SheetType = keyof typeof sheetTypes;
export type SheetFields<T extends SheetType> = ReturnType<
  typeof sheetTypes[T]["defaultValues"]
>;

function defineSheetType<T>(sheet: {
  columns: number;
  defaultValues: () => T;
}) {
  return sheet;
}

const sheetTypes = {
  character: defineSheetType({
    columns: 12,
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
    columns: 6,
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
    columns: 12,
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
};

export default sheetTypes;
