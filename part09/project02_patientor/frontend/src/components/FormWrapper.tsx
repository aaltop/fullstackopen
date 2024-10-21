import { PropsWithChildren } from "react";
import { Button} from "@mui/material";

interface Props {
    onSubmit(ev: React.SyntheticEvent): void;
    onCancel(): void
}


export default function FormWrapper({ onSubmit, onCancel, children }: Props & PropsWithChildren)
{

    return (
        <form onSubmit={onSubmit}>
            {children}
            <Button
                variant="contained"
                type="submit"
            >
                Add
            </Button>
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