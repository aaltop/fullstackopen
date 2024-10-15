import { Patient as PatientType, Entry as EntryType } from "../../types";
import patientService from "../../services/patients";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Container, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from "@mui/icons-material/Female";


function Entry({ entry }: { entry: EntryType })
{

    let codes = entry.diagnosisCodes?.join(", ") ?? null;
    if (codes) codes = `Diagnosis codes: ${codes}`;

    return (
        <div style={{
            borderBlock: "1px solid black",
            paddingBlock: "1em",
            marginBlock: "1px"
        }}>
            {`${entry.date}: `} <i>{entry.description}</i><br></br>
            {codes}
        </div>
    );
}


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
            <Typography variant="h5">Entries</Typography>
            {patient.entries.map(entry => <Entry key={entry.id} entry={entry} />)}
        </Container>
    );

}