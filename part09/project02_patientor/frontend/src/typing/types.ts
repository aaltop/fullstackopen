import parsers from "./parsers";

import { z } from "zod";

export type Diagnosis = z.infer<typeof parsers.Diagnosis>;

export type Patient = z.infer<typeof parsers.Patient>;
export type NonSensitivePatient = z.infer<typeof parsers.NonSensitivePatient>;
export type NewPatient = z.infer<typeof parsers.NewPatient>;

export type HealthCheckEntry = z.infer<typeof parsers.HealthCheckEntry>;
export type NewHealthCheckEntry = z.infer<typeof parsers.NewHealthCheckEntry>;
export type HospitalEntry = z.infer<typeof parsers.HospitalEntry>;
export type NewHospitalEntry = z.infer<typeof parsers.NewHospitalEntry>;
export type OccupationalHealthcareEntry = z.infer<typeof parsers.OccupationalHealthcareEntry>;
export type NewOccupationalHealthcareEntry = z.infer<typeof parsers.NewOccupationalHealthcareEntry>;
export type Entry = z.infer<typeof parsers.Entry>;
export type NewEntry = z.infer<typeof parsers.NewEntry>;
export type EntryUnion = z.infer<typeof parsers.EntryUnion>;
export type NewEntryUnion = z.infer<typeof parsers.NewEntryUnion>;
export type NewEntryDifferenceUnion = Omit<NewHealthCheckEntry, keyof NewEntry>
| Omit<NewOccupationalHealthcareEntry, keyof NewEntry>
| Omit<NewHospitalEntry, keyof NewEntry>;
export type EntryTypeUnion = z.infer<typeof parsers.EntryTypeUnion>;


export interface UseStateProps<T> {
    state: T,
    setState: React.Dispatch<React.SetStateAction<T>>,
}

export type ErrorResponse = {
    error: string
};

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}