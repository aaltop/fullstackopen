import { NewEntryUnion, NewEntry } from "../../typing/types";
import parsers from "../../typing/parsers";

import { useState } from "react";
import { TextField } from "@mui/material";


interface Props {
    onSubmit(ev: React.SyntheticEvent, newEntry: NewEntryUnion): void
}

function emptyNewEntry(): NewEntry
{
    return {
        date: "",
        description: "",
        specialist: ""
    };
}

function HealthCheckEntryForm({ rating, setRating }: { rating: number, setRating: React.Dispatch<React.SetStateAction<number>>})
{

    // TextField does not allow min and max, it looks like,
    // so do this
    function minmaxRating(rat: string)
    {
        return Math.min(
            1,
            Math.max(0, parseInt(rat))
        );
    }
    // Number type apparently not recommended, but the correct
    // one isn't currently available
    return (
        <>
            <TextField
                label="health check rating"
                type="number"
                value={rating}
                onChange={ev => setRating(minmaxRating(ev.target.value))}
            ></TextField>
        </>
    );
}

export default function NewEntryForm({ onSubmit }: Props)
{
    const [baseEntry, setBaseEntry] = useState(emptyNewEntry);
    const [rating, setRating] = useState(0);

    function submitForm(ev: React.SyntheticEvent)
    {

        try {
            const form = parsers.NewEntryUnion.parse({
                ...baseEntry,
                healthCheckRating: rating,
                type: "HealthCheck"
            });
            onSubmit(ev, form);
        } catch (error) {
            console.log("Error encountered");
        }

    }

    return (
        <form onSubmit={submitForm}>
            <TextField
                label="date"
                value={baseEntry.date}
                onChange={ev => setBaseEntry({ ...baseEntry, date: ev.target.value})}
            ></TextField>
            <TextField
                label="description"
                value={baseEntry.description}
                onChange={ev => setBaseEntry({ ...baseEntry, description: ev.target.value})}
            ></TextField>
            <TextField
                label="specialist"
                value={baseEntry.specialist}
                onChange={ev => setBaseEntry({ ...baseEntry, specialist: ev.target.value})}
            ></TextField>
            <HealthCheckEntryForm rating={rating} setRating={setRating}/>
            <button type="submit">Add</button>
        </form>
    );
}