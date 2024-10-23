import { z } from "zod";


const GenderEnum = z.enum(["male", "female", "other"]);


const Diagnosis = z.object({
    code: z.string(),
    name: z.string(),
    latin: z.string().optional()
});

const Entry = z.object({
    id: z.string(),
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    diagnosisCodes: z.array(Diagnosis.shape.latin).optional()
});

const NewEntry = Entry.omit({ id: true});

const sickLeave = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional()
});
const OccupationalHealthcareEntry = Entry.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: sickLeave.optional()
});
const NewOccupationalHealthcareEntry = OccupationalHealthcareEntry.omit({
    id: true
});

const HospitalEntry = Entry.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string()
    }).optional()
});
const NewHospitalEntry = HospitalEntry.omit({ id: true});

const HealthCheckEntry = Entry.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.number()
});

const EntryTypeEnum = z.enum([
    "OccupationalHealthcare",
    "Hospital",
    "HealthCheck",
]);

const NewHealthCheckEntry = HealthCheckEntry.omit({
    id: true
});

const EntryUnion = z.union([HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry]);
const NewEntryUnion = z.union([
    NewHospitalEntry,
    NewHealthCheckEntry,
    NewOccupationalHealthcareEntry
]);

const Patient = z.object({
    id: z.string(),
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: GenderEnum,
    occupation: z.string(),
    entries: z.array(EntryUnion)
});

const NewPatient = Patient.omit({
    id: true,
    entries: true
});

const NonSensitivePatient = Patient.omit({
    ssn: true,
    entries: true
});

export default {
    GenderEnum,
    Patient,
    NewPatient,
    NonSensitivePatient,
    Diagnosis,
    Entry,
    NewEntry,
    HospitalEntry,
    NewHospitalEntry,
    HealthCheckEntry,
    NewHealthCheckEntry,
    OccupationalHealthcareEntry,
    NewOccupationalHealthcareEntry,
    EntryUnion,
    NewEntryUnion,
    EntryTypeEnum
};