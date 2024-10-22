import { NewEntry, UseStateProps} from "../../typing/types";

import { TextField, Input, FormLabel } from "@mui/material";

export default function BaseEntryForm({ state, setState }: UseStateProps<NewEntry>)
{
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
        </>
    );
}