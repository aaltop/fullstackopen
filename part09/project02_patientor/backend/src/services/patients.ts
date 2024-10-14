import { NonSensitivePatient, Patient, NewPatient } from "../typing/types";
import data from "../data/patients";

import { v1 as uuid} from "uuid";

function patientToNonSensitive(patient: Patient): NonSensitivePatient {
    const {
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }: NonSensitivePatient = patient;
    return { id, name, dateOfBirth, gender, occupation };
}

function getAll(nonSensitive: boolean = true): NonSensitivePatient[] | Patient[]
{
    if (!nonSensitive) return data;

    const nonSensitiveData: NonSensitivePatient[] = data.map(patientToNonSensitive);
    return nonSensitiveData;
}

function addPatient(newPatient: NewPatient, nonSensitive: boolean = true): 
NonSensitivePatient 
| Patient 
{
    const addedPatient: Patient = {...newPatient, id: uuid()};
    data.push(addedPatient);

    if (!nonSensitive) return addedPatient;
    return patientToNonSensitive(addedPatient);
} 

function getPatient(patientId: string, nonSensitive: true): NonSensitivePatient | null;
function getPatient(patientId:string, nonSensitive: false): Patient | null;
function getPatient(patientId: string, nonSensitive: boolean = true):
NonSensitivePatient
| Patient
| null
{
    const foundPatient: Patient | undefined = data.find(({ id }) => id === patientId);
    if (foundPatient === undefined) return null;
    if (nonSensitive) {
        return patientToNonSensitive(foundPatient);
    } else {
        return foundPatient;
    }
}


export default {
    getAll,
    addPatient,
    getPatient
};