import { NewEntry, UseStateProps} from "../../typing/types";
import { DiagnosesContext } from "../../contexts";

import { TextField, Input, FormLabel, Select, MenuItem } from "@mui/material";
import { useContext } from "react";


export default function BaseEntryForm({ state, setState }: UseStateProps<NewEntry>)
{

    const diagnoses = useContext(DiagnosesContext);

    return (
        <>
            <FormLabel>
            {"Entry Date"}
                <Input
                    type="date"
                    required
                    fullWidth
                    value={state.date}
                    onChange={ev => setState({ ...state, date: ev.target.value})}
                ></Input>
            </FormLabel>
            <TextField
                label="description"
                required
                fullWidth
                value={state.description}
                onChange={ev => setState({ ...state, description: ev.target.value})}
            ></TextField>
            <TextField
                label="specialist"
                required
                fullWidth
                value={state.specialist}
                onChange={ev => setState({ ...state, specialist: ev.target.value})}
            ></TextField>
            <Select
                value={state.diagnosisCodes}
                multiple
                fullWidth
                label="Diagnosis Codes"
                onChange={ev => setState({
                    ...state,
                    diagnosisCodes: typeof ev.target.value === "string"
                        ? [ev.target.value]
                        : ev.target.value
                })}
                renderValue={selected => <>
                {selected.map(item => {
                    const diag = diagnoses.find(diagn => diagn.code === item);
                    // shouldn't be undefined, but anyway
                    if (diag === undefined) return null;
                    return <div key={item}>{`${diag.code}: ${diag.name}`}</div>;
                })}
                </>
                }
            >
                {diagnoses.map(diag => (
                    <MenuItem
                        key={diag.code}
                        value={diag.code}
                    >
                        {`${diag.code}: ${diag.name}`}
                    </MenuItem>
                ))}

            </Select>
        </>
    );
}