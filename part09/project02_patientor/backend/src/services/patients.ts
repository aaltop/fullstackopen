import { NonSensitivePatient, Patient } from "../types";
import data from "../data/patients";

function patientToNonSensitive(patient: Patient): NonSensitivePatient {
    const {
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }: NonSensitivePatient = patient;
    return { id, name, dateOfBirth, gender, occupation};
}

function getAll(nonSensitive: boolean = true): NonSensitivePatient[] | Patient[]
{
    if (!nonSensitive) return data;

    const nonSensitiveData: NonSensitivePatient[] = data.map(patientToNonSensitive);
    return nonSensitiveData;
}


export default {
    getAll
};