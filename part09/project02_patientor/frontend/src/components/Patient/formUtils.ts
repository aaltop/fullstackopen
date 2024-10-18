import { NewEntry } from "../../typing/types";

export function emptyNewEntry(): NewEntry
{
    return {
        date: "",
        description: "",
        specialist: ""
    };
}