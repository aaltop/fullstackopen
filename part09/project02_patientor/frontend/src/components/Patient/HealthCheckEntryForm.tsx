import BaseEntryForm from "./BaseEntryForm";
import FormWrapper from "../FormWrapper";
import parsers from "../../typing/parsers";
import { FormProps, submitForm } from "../formUtils";
import { emptyHealthCheckEntry, emptyNewEntry } from "./emptyEntryFactories";
import { NewHealthCheckEntry } from "../../typing/types";

import { useState } from "react";
import { TextField } from "@mui/material";

interface Props extends FormProps {
    onSubmit(ev: React.SyntheticEvent, entry: NewHealthCheckEntry): void
}

export default function HealthCheckEntryForm({ onSubmit, onCancel, modalControls }: Props)
{

    const [baseEntry, setBaseEntry] = useState(emptyNewEntry);
    const [addedEntry, setAddedEntry] = useState(emptyHealthCheckEntry);

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
    const AddedFields = (
        <>
            <TextField
                label="health check rating"
                type="number"
                fullWidth
                value={addedEntry.healthCheckRating}
                onChange={ev => setAddedEntry({
                    ...addedEntry,
                    healthCheckRating: minmaxRating(ev.target.value)
                })}
            ></TextField>
        </>
    );
    return (
        <FormWrapper
            onSubmit={ev => submitForm(ev, modalControls, (eve) => {
                const form = parsers.NewHealthCheckEntry.parse({
                    ...baseEntry,
                    ...addedEntry
                });
                onSubmit(eve, form);
            })}
            onCancel={onCancel}
        >
            <BaseEntryForm
                state={baseEntry}
                setState={setBaseEntry}
            ></BaseEntryForm>
            {AddedFields}
        </FormWrapper>
    );
}