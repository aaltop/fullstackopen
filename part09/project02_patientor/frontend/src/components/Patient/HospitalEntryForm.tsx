import BaseEntryForm from "./BaseEntryForm";
import FormWrapper from "../FormWrapper";
import parsers from "../../typing/parsers";
import { FormProps, submitForm } from "../formUtils";
import { emptyNewEntry, emptyHospitalEntry } from "./emptyEntryFactories";
import { NewEntry, NewHospitalEntry } from "../../typing/types";

import { useState } from "react";
import { Input, FormLabel, TextField } from "@mui/material";

interface Props extends FormProps {
    onSubmit(ev: React.SyntheticEvent, entry: NewHospitalEntry): void;
}

export default function HospitalEntryForm({ onSubmit, onCancel, modalControls }: Props)
{

    const [baseEntry, setBaseEntry] = useState(emptyNewEntry);
    const [addedEntry, setAddedEntry] = useState(emptyHospitalEntry);

    // if there is a reason given for discharge, must have a date too
    // but not necessary to have a reason always
    const dateRequired = addedEntry.discharge.criteria.length > 0;
    
    const AddedFields = (
        <>
            <FormLabel>
            {"Discharge date"}
                <Input
                    type="date"
                    fullWidth
                    required={dateRequired}
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

                let actualEntry: Omit<NewHospitalEntry, keyof NewEntry> = addedEntry;

                // If no valid date string, don't use "discharge"
                const validDate = parsers.HospitalEntry.shape
                    .date.safeParse(addedEntry.discharge.date)
                    .success;
                actualEntry = validDate
                    ? actualEntry
                    : { ...actualEntry, discharge: undefined};
                const form = parsers.NewHospitalEntry.parse({ ...baseEntry, ...actualEntry});
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