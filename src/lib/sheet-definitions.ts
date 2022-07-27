import { array, InferType, object, ObjectSchema, string } from "yup";
export type SheetType = keyof typeof sheetTypes;
export type SheetFields<T extends SheetType> = InferType<
  typeof sheetTypes[T]["schema"]
>;

function defineSheetType<T extends Record<string, any>>(sheet: {
  columns: string;
  schema: ObjectSchema<T>;
}) {
  return sheet;
}

const stringField = string().default("");
const arrayField = array(string().default("")).default(() => []);

const sheetTypes = {
  character: defineSheetType({
    columns: "col-12 col-lg-12 col-xxxl-8",
    schema: object({
      name: stringField,
      pronouns: stringField,
      playbook: stringField,
      animalForm: stringField,
      playerName: stringField,
      playerPronouns: stringField,
      care: stringField,
      personality: stringField,
      look: stringField,
      prompts: arrayField,
      advancements: arrayField,
      notes: arrayField,
      canAlways: arrayField,
    }),
  }),
  kith: defineSheetType({
    columns: "col-12 col-lg-6 col-xxxl-4",
    schema: object({
      name: stringField,
      pronouns: stringField,
      form: stringField,
      traits: arrayField,
      canAlways: arrayField,
      relationships: arrayField,
      details: arrayField,
      notes: arrayField,
    }),
  }),
  place: defineSheetType({
    columns: "col-12 col-lg-12 col-xxxl-8",
    schema: object({
      name: stringField,
      animalFolk: stringField,
      smallAndForgottenGods: stringField,
      natures: arrayField,
      aestheticElements: arrayField,
      folklore: arrayField,
      notes: arrayField,
    }),
  }),
  season: defineSheetType({
    columns: "col-12 col-lg-6 col-xxxl-4",
    schema: object({
      name: stringField,
      year: stringField,
      firstMonthName: stringField,
      firstMonthSpentAt: stringField,
      firstMonthPresent: arrayField,
      firstMonthSigns: arrayField,
      firstMonthNotes: arrayField,
      secondMonthName: stringField,
      secondMonthSpentAt: stringField,
      secondMonthPresent: arrayField,
      secondMonthSigns: arrayField,
      secondMonthNotes: arrayField,
      holiday: stringField,
      holidayCelebratedAt: stringField,
      holidayTraditions: arrayField,
      holidayHowCelebrated: stringField,
      holidayCan: arrayField,
    }),
  }),
};

export default sheetTypes;
