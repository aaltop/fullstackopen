import parsers from "./parsers";

import { z } from "zod";

export type Diagnosis = z.infer<typeof parsers.Diagnosis>;

export type Patient = z.infer<typeof parsers.Patient>;
export type NonSensitivePatient = z.infer<typeof parsers.NonSensitivePatient>;
export type NewPatient = z.infer<typeof parsers.NewPatient>;

export type HealthCheckEntry = z.infer<typeof parsers.HealthCheckEntry>;
export type HospitalEntry = z.infer<typeof parsers.HospitalEntry>;
export type OccupationalHealthcareEntry = z.infer<typeof parsers.OccupationalHealthcareEntry>;
export type Entry = z.infer<typeof parsers.EntryUnion>;

export type ErrorResponse = {
    error: string
};

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}