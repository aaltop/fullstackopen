import parsers from "./parsers";

import { z } from "zod";

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export type Patient = z.infer<typeof parsers.Patient>;
export type NonSensitivePatient = z.infer<typeof parsers.NonSensitivePatient>;
export type NewPatient = z.infer<typeof parsers.NewPatient>;

export type ErrorResponse = {
    error: string
};