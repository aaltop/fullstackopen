import useModalControls from "./hooks/useModalControls";

import { ZodError } from "zod";

type ModalControlsType = ReturnType<typeof useModalControls>;
export interface FormProps {
    onSubmit(ev: React.SyntheticEvent, entry: unknown): void;
    onCancel(): void;
    modalControls: ModalControlsType;
}

export function submitForm(
    ev: React.SyntheticEvent,
    modalControls: ModalControlsType,
    handleSubmit: (ev: React.SyntheticEvent, modalControls: ModalControlsType) => void
)
{

    try {
        handleSubmit(ev, modalControls);
    } catch (error) {
        ev.preventDefault();
        switch (true) {
            case (error instanceof ZodError): {
                // doesn't really seem to work properly with 
                // the Alert thingy
                const message: string = error.errors.map(err => err.message).join("\n");
                modalControls.setError(message);
                break;
            } default: {
                console.log("Error encountered");
            }
        }
    }

}