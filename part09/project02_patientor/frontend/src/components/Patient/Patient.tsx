import { Patient as PatientType, Entry as EntryType, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import { DiagnosesContext } from "../../contexts";

import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { Container, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from "@mui/icons-material/Female";


function Entry({ entry }: { entry: EntryType })
{

    const diagnoses: Diagnosis[] = useContext(DiagnosesContext);

    let codes: string[] = [];
    if (entry.diagnosisCodes && entry.diagnosisCodes.length > 0) {
        codes = entry.diagnosisCodes.map(code => {
            const foundDiag = diagnoses.find(diag => {
                return diag.code === code;
            });
            if (foundDiag === undefined) return `${code}`;
            return `${foundDiag.code}: ${foundDiag.name}`;
        });

    }

    return (
        <div style={{
            borderBlock: "1px solid black",
            paddingBlock: "1em",
            marginBlock: "1px"
        }}>
            {`${entry.date}: `} <i>{entry.description}</i><br></br>
            <Typography
                variant="h6"
                style={{ display: codes.length > 0 ? "" : "none"}}
            >
                Diagnoses
            </Typography>
            {codes.map((code, i) => <div key={i}>{code}</div>)}
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