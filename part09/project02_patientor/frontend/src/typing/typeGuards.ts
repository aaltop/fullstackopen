import {
    HealthCheckEntry,
    EntryUnion,
    OccupationalHealthcareEntry,
    HospitalEntry,
    ErrorResponse
} from "./types";


export function isHealthCheckEntry(obj: EntryUnion): obj is HealthCheckEntry
{
    return (obj.type === "HealthCheck");
}

export function isOccupationalHealthcareEntry(obj: EntryUnion): obj is OccupationalHealthcareEntry
{
    return (obj.type === "OccupationalHealthcare");
}

export function isHospitalEntry(obj: EntryUnion): obj is HospitalEntry
{
    return (obj.type === "Hospital");
}

export function isErrorResponse(obj: object): obj is ErrorResponse
{
    return ("error" in obj && typeof obj.error === "string");
}