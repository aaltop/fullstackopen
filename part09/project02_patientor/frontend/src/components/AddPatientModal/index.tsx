import Modal from '../Modal';
import AddPatientForm from "./AddPatientForm";
import { NewPatient } from "../../typing/types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewPatient) => void;
  error?: string;
}

function AddPatientModal({ modalOpen, onClose, onSubmit, error }: Props)
{

    return (
        <Modal
            modalOpen={modalOpen}
            onClose={onClose}
            error={error}
            dialogTitle='Add a new patient'
        >
            <AddPatientForm onSubmit={onSubmit} onCancel={onClose}/>
        </Modal>
    );
}

export default AddPatientModal;
