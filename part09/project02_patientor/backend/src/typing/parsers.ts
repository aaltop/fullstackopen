import { z } from "zod";


const GenderEnum = z.enum(["male", "female", "other"]);

const Entry = z.object({
    description: z.string(),
    creationDate: z.string().date(),
    creatorInfo: z.string(),
    diagnosisCodes: z.array(z.string())
});

const Patient = z.object({
    id: z.string(),
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: GenderEnum,
    occupation: z.string(),
    entries: z.array(Entry)
});

const NewPatient = Patient.omit({
    id: true
});

const NonSensitivePatient = Patient.omit({
    ssn: true,
    entries: true
});

export default {
    GenderEnum,
    Patient,
    NewPatient,
    NonSensitivePatient
};