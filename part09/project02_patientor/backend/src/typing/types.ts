import parsers from "./parsers";

import { z } from "zod";

export type Diagnosis = z.infer<typeof parsers.Diagnosis>;

export type Patient = z.infer<typeof parsers.Patient>;
export type NonSensitivePatient = z.infer<typeof parsers.NonSensitivePatient>;
export type NewPatient = z.infer<typeof parsers.NewPatient>;

export type Entry = z.infer<typeof parsers.EntryUnion>;
export type NewEntry = z.infer<typeof parsers.NewEntryUnion>;

export type ErrorResponse = {
    error: string
};