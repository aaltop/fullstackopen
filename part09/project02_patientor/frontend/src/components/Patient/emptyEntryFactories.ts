import { NewEntry, NewHealthCheckEntry, NewOccupationalHealthcareEntry} from "../../typing/types";


export function emptyNewEntry(): NewEntry
{
    return {
        date: "",
        description: "",
        specialist: ""
    };
}


export function emptyHealthCheckEntry(): Omit<NewHealthCheckEntry, keyof NewEntry>
{
    return {
        type: "HealthCheck",
        healthCheckRating: 0
    };
}

export function emptyOccupationalHealthcareEntry(): Omit<NewOccupationalHealthcareEntry, keyof NewEntry>
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