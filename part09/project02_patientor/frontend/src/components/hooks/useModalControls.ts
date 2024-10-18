
import { useState } from "react";

export default function useModalControls()
{
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalIsOpen(true);

    const closeModal = (): void => {
        setModalIsOpen(false);
        setError(undefined);
    };

    return {
        modalIsOpen,
        setModalIsOpen,
        error,
        setError,
        openModal,
        closeModal
    };
}