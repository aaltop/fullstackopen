import { Patient as PatientType } from "../../types";
import patientService from "../../services/patients";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Container, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from "@mui/icons-material/Female";



export default function Patient()
{
    const params = useParams();
    const [patient, setPatient] = useState<PatientType | null>(null);

    useEffect(() => {
        async function fetchPatient()
        {
            const { id } = params;
            if (id === undefined) return;
            const patient = await patientService.getById(id);
            setPatient(patient);
        }
        fetchPatient();
    }, [params]);

    if (patient === null) return null;

    let genderIcon = null;
    if (patient.gender === "male") genderIcon = <MaleIcon />;
    else if (patient.gender === "female") genderIcon = <FemaleIcon />;

    return (
        <Container style={{ marginBlock: "1em"}}>
            <Typography variant="h4">{patient.name} {genderIcon}</Typography>
            {`ssn: ${patient.ssn ?? "unknown"}`} <br></br>
            {`occupation: ${patient.occupation}`}
        </Container>
    );

}