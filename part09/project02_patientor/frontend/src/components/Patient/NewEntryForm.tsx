import { NewEntry } from "../../typing/types";

import { PropsWithChildren } from "react";
import { TextField, Button} from "@mui/material";


interface Props {
    onSubmit(ev: React.SyntheticEvent): void,
    baseEntry: NewEntry,
    setBaseEntry: React.Dispatch<React.SetStateAction<NewEntry>>
}

export default function NewEntryForm({ onSubmit, baseEntry, setBaseEntry, children }: Props & PropsWithChildren)
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
            <Button type="submit">Add</Button>
        </form>
    );
}