import { Patient as PatientType } from "../types";

import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from "@mui/icons-material/Female";


export default function Patient( { patients }: { patients: PatientType[]})
{
    const { id } = useParams();

    if (id === undefined) return null;

    const patient = patients.find(patient => patient.id === id);
    if (patient === undefined) return null;

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