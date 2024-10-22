import BaseEntryForm from "./BaseEntryForm";
import FormWrapper from "../FormWrapper";
import parsers from "../../typing/parsers";
import { FormProps, submitForm } from "../formUtils";
import { emptyNewEntry, emptyHospitalEntry } from "./emptyEntryFactories";
import { NewHospitalEntry } from "../../typing/types";

import { useState } from "react";
import { Input, FormLabel, TextField } from "@mui/material";

interface Props extends FormProps {
    onSubmit(ev: React.SyntheticEvent, entry: NewHospitalEntry): void;
}

export default function HospitalEntryForm({ onSubmit, onCancel, modalControls }: Props)
{

    const [baseEntry, setBaseEntry] = useState(emptyNewEntry);
    const [addedEntry, setAddedEntry] = useState(emptyHospitalEntry);
    
    const AddedFields = (
        <>
            <FormLabel>
            {"Discharge date"}
                <Input
                    required
                    type="date"
                    fullWidth
                    value={addedEntry.discharge.date}
                    onChange={ev => setAddedEntry({
                        ...addedEntry,
                        discharge: {
                            ...addedEntry.discharge,
                            date: ev.target.value
                        }
                    })}
                ></Input>
            </FormLabel>
            <TextField
                required
                label="Reason for discharge"
                fullWidth
                value={addedEntry.discharge.criteria}
                onChange={ev => setAddedEntry({
                    ...addedEntry,
                    discharge: {
                        ...addedEntry.discharge,
                        criteria: ev.target.value
                    }
                })}
            >
            </TextField>
        </>
    );



    return (
        <FormWrapper
            onSubmit={ev => submitForm(ev, modalControls, (eve) => {
                const form = parsers.NewHospitalEntry.parse({
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