import {
    HealthCheckEntry,
    Entry,
    OccupationalHealthcareEntry,
    HospitalEntry
} from "./types";


export function isHealthCheckEntry(obj: Entry): obj is HealthCheckEntry
{
    return (obj.type === "HealthCheck");
}

export function isOccupationalHealthcareEntry(obj: Entry): obj is OccupationalHealthcareEntry
{
    return (obj.type === "OccupationalHealthcare");
}

export function isHospitalEntry(obj: Entry): obj is HospitalEntry
{
    return (obj.type === "Hospital");
}