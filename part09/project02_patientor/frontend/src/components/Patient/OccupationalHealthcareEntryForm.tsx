import BaseEntryForm from "./BaseEntryForm";
import { FormProps, submitForm } from "../formUtils";
import { emptyOccupationalHealthcareEntry, emptyNewEntry } from "./emptyEntryFactories";
import parsers from "../../typing/parsers";
import { NewOccupationalHealthcareEntry } from "../../typing/types";

import { useState } from "react";
import FormWrapper from "../FormWrapper";

import { TextField } from "@mui/material";

interface Props extends FormProps {
    onSubmit(ev: React.SyntheticEvent, entry: NewOccupationalHealthcareEntry): void
}

export default function OccupationalHealthcareEntryForm({ onSubmit, onCancel, modalControls }: Props)
{
    const [baseEntry, setBaseEntry] = useState(emptyNewEntry);
    const [addedEntry, setAddedEntry] = useState(emptyOccupationalHealthcareEntry);

    const addedForm = (
        <>
            <TextField
                label="employer name"
                type="text"
                fullWidth
                value={addedEntry.employerName}
                onChange={ev => setAddedEntry({
                    ...addedEntry,
                    employerName: ev.target.value
                })}
            ></TextField>
            <TextField
                label="sick leave start date"
                type="date"
                fullWidth
                value={addedEntry.sickLeave?.startDate}
                onChange={ev => setAddedEntry({
                    ...addedEntry,
                    sickLeave: {
                        ...addedEntry.sickLeave,
                        startDate: ev.target.value
                    }
                })}
            ></TextField>
            <TextField
                label="sick leave end date"
                type="date"
                fullWidth
                value={addedEntry.sickLeave?.endDate}
                onChange={ev => setAddedEntry({
                    ...addedEntry,
                    sickLeave: {
                        ...addedEntry.sickLeave,
                        endDate: ev.target.value
                    }
                })}
            ></TextField>
        </>
    );

    return (
        <FormWrapper
            onSubmit={ev => submitForm(ev, modalControls, () => {
                const form = parsers.NewOccupationalHealthcareEntry.parse({
                    ...baseEntry,
                    ...addedEntry
                });
                onSubmit(ev, form);
            })}
            onCancel={onCancel}
        >
            <BaseEntryForm
                state={baseEntry}
                setState={setBaseEntry}
            ></BaseEntryForm>
            {addedForm}
        </FormWrapper>
    );
}