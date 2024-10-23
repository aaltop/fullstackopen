import {
    NewEntry,
    NewHealthCheckEntry,
    NewOccupationalHealthcareEntry,
    NewHospitalEntry,
} from "../../typing/types";


export function emptyNewEntry(): NewEntry
{
    return {
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: []
    };
}


export function emptyHealthCheckEntry(): Required<Omit<NewHealthCheckEntry, keyof NewEntry>>
{
    return {
        type: "HealthCheck",
        healthCheckRating: 0
    };
}

export function emptyOccupationalHealthcareEntry(): Required<Omit<NewOccupationalHealthcareEntry, keyof NewEntry>>
{
    return {
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
            startDate: "",
            endDate: ""
        }
    };
}

export function emptyHospitalEntry(): Required<Omit<NewHospitalEntry, keyof NewEntry>>
{
    return {
        type: "Hospital",
        discharge: {
            date: "",
            criteria: ""
        }
    };
}