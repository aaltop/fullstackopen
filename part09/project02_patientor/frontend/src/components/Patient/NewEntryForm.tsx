import { NewEntry } from "../../typing/types";

import { PropsWithChildren } from "react";
import { TextField, Button} from "@mui/material";


interface Props {
    onSubmit(ev: React.SyntheticEvent): void,
    baseEntry: NewEntry,
    setBaseEntry: React.Dispatch<React.SetStateAction<NewEntry>>,
    onCancel(): void
}

export default function NewEntryForm({ onSubmit, baseEntry, setBaseEntry, children, onCancel }: Props & PropsWithChildren)
{

    return (
        <form onSubmit={onSubmit}>
            <TextField
                label="date"
                fullWidth
                value={baseEntry.date}
                onChange={ev => setBaseEntry({ ...baseEntry, date: ev.target.value})}
            ></TextField>
            <TextField
                label="description"
                fullWidth
                value={baseEntry.description}
                onChange={ev => setBaseEntry({ ...baseEntry, description: ev.target.value})}
            ></TextField>
            <TextField
                label="specialist"
                fullWidth
                value={baseEntry.specialist}
                onChange={ev => setBaseEntry({ ...baseEntry, specialist: ev.target.value})}
            ></TextField>
            {children}
            <Button variant="contained" type="submit">Add</Button>
            <Button
                variant="contained"
                type="button"
                onClick={onCancel}
            >
                Cancel
            </Button>
        </form>
    );
}