import {
    Patient as PatientType,
    Entry as EntryType,
    Diagnosis,
    
} from "../../types";
import patientService from "../../services/patients";
import { DiagnosesContext } from "../../contexts";
import {
    isHealthCheckEntry,
    isOccupationalHealthcareEntry,
    isHospitalEntry
} from "../../typeGuards";

import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { Container, Typography } from "@mui/material";

// MUI Icons
// ---------------
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from "@mui/icons-material/Female";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
// ===================


function Entry({ entry }: { entry: EntryType })
{

    const diagnoses: Diagnosis[] = useContext(DiagnosesContext);

    let Icon: typeof LocalHospitalIcon | undefined = undefined;
    switch (true) {
        case (isHealthCheckEntry(entry)): {
            Icon = MonitorHeartIcon;
            break;
        } case (isOccupationalHealthcareEntry(entry)): {
            Icon = WorkIcon;
            break;
        } case (isHospitalEntry(entry)): {
            Icon = LocalHospitalIcon;
            break;
        } default: {
            // fine to just do this too, no?
            throw new Error("Unhandled entry type");
        }
    }

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
            <Typography variant="h6"
            >
                {entry.date} <Icon />
            </Typography>
            <i>{entry.description}</i>
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