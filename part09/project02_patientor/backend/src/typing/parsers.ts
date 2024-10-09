import { z } from "zod";


const GenderEnum = z.enum(["male", "female", "other"]);

const Patient = z.object({
    id: z.string(),
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: GenderEnum,
    occupation: z.string()
});

const NewPatient = Patient.omit({
    id: true
});

const NonSensitivePatient = Patient.omit({
    ssn: true
});

export default {
    GenderEnum,
    Patient,
    NewPatient,
    NonSensitivePatient
};