import { NewEntry, UseStateProps} from "../../typing/types";

import { TextField } from "@mui/material";

export default function BaseEntryForm({ state, setState }: UseStateProps<NewEntry>)
{

    return (
        <>
            <TextField
                label="date"
                fullWidth
                value={state.date}
                onChange={ev => setState({ ...state, date: ev.target.value})}
            ></TextField>
            <TextField
                label="description"
                fullWidth
                value={state.description}
                onChange={ev => setState({ ...state, description: ev.target.value})}
            ></TextField>
            <TextField
                label="specialist"
                fullWidth
                value={state.specialist}
                onChange={ev => setState({ ...state, specialist: ev.target.value})}
            ></TextField>
        </>
    );
}