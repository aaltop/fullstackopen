import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import { PropsWithChildren } from 'react';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    error?: string,
    dialogTitle: string,
}

export default function Modal(props: Props & PropsWithChildren)
{

    const { modalOpen, onClose, dialogTitle, error }: Props = props;

    return (
    <Dialog fullWidth={true} open={modalOpen} onClose={onClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            {props.children}
        </DialogContent>
    </Dialog>
  );
}