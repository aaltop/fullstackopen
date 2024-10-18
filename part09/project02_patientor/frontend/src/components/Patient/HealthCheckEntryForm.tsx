import NewEntryForm from "./NewEntryForm";
import { NewHealthCheckEntry } from "../../typing/types";
import parsers from "../../typing/parsers";
import { emptyNewEntry } from "./formUtils";
import useModalControls from "../hooks/useModalControls";

import { useState } from "react";
import { TextField } from "@mui/material";
import { ZodError } from "zod";

interface Props {
    onSubmit(ev: React.SyntheticEvent, entry: NewHealthCheckEntry): void;
    onCancel(): void;
    modalControls: ReturnType<typeof useModalControls>;
}

export default function HealthCheckEntryForm({ onSubmit, onCancel, modalControls }: Props)
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
            switch (true) {
                case (error instanceof ZodError): {
                    // doesn't really seem to work properly with 
                    // the Alert thingy
                    const message: string = error.errors.map(err => err.message).join("\n");
                    modalControls.setError(message);
                    break;
                } default: {
                    console.log("Error encountered");
                }
            }
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
            onCancel={onCancel}
        >
            {AddedFields}
        </NewEntryForm>
    );
}