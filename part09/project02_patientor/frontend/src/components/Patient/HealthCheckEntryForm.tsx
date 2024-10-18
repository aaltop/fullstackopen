import NewEntryForm from "./NewEntryForm";
import { NewHealthCheckEntry } from "../../typing/types";
import parsers from "../../typing/parsers";
import { emptyNewEntry } from "./formUtils";

import { useState } from "react";
import { TextField } from "@mui/material";


export default function HealthCheckEntryForm({ onSubmit }: { onSubmit: (ev: React.SyntheticEvent, entry: NewHealthCheckEntry) => void})
{

    const [baseEntry, setBaseEntry] = useState(emptyNewEntry);
    const [rating, setRating] = useState(0);

    // TextField does not allow min and max, it looks like,
    // so do this
    function minmaxRating(rat: string)
    {
        return Math.min(
            1,
            Math.max(0, parseInt(rat))
        );
    }

    function submitForm(ev: React.SyntheticEvent)
    {

        try {
            const form = parsers.NewHealthCheckEntry.parse({
                ...baseEntry,
                healthCheckRating: rating,
                type: "HealthCheck"
            });
            onSubmit(ev, form);
        } catch (error) {
            ev.preventDefault();
            console.log("Error encountered");
        }

    }
    
    // Number type apparently not recommended, but the correct
    // one isn't currently available
    const AddedFields = (
        <>
            <TextField
                label="health check rating"
                type="number"
                fullWidth
                value={rating}
                onChange={ev => setRating(minmaxRating(ev.target.value))}
            ></TextField>
        </>
    );
    return (
        <NewEntryForm
            onSubmit={submitForm}
            baseEntry={baseEntry}
            setBaseEntry={setBaseEntry}
        >
            {AddedFields}
        </NewEntryForm>
    );
}