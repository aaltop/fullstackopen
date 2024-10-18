import {
    Patient as PatientType,
    EntryUnion as EntryType,
    Diagnosis,
    
} from "../../typing/types";
import patientService from "../../services/patients";
import { DiagnosesContext } from "../../contexts";
import {
    isHealthCheckEntry,
    isOccupationalHealthcareEntry,
    isHospitalEntry
} from "../../typeGuards";
import HealthCheckEntryForm from "./HealthCheckEntryForm";

import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, ReactElement } from "react";

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

    let Icon: ReactElement | null = null;
    let ExtraInfo: ReactElement | null = null;
    switch (true) {
        case (isHealthCheckEntry(entry)): {
            Icon = <><MonitorHeartIcon /></>;
            ExtraInfo = <>{`Health rating: ${entry.healthCheckRating}`}</>;
            break;
        } case (isOccupationalHealthcareEntry(entry)): {
            Icon = <><WorkIcon />{entry.employerName}</>;
            if (entry.sickLeave !== undefined
                && (entry.sickLeave.startDate !== undefined 
                    || entry.sickLeave.endDate !== undefined
                )
            ) {
                // not sure why I've set it as optional, but whatever.
                const start = entry.sickLeave.startDate ?? "";
                const end = entry.sickLeave.endDate ?? "";
                ExtraInfo = <>{`Sick leave period: ${start}--${end}`}</>;
            }
            break;
        } case (isHospitalEntry(entry)): {
            Icon = <><LocalHospitalIcon /></>;
            const { date, criteria } = entry.discharge;
            ExtraInfo = <>{`Discharged on ${date}: ${criteria}`}</>;
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
                {entry.date} {Icon}
            </Typography>
            <i>{entry.description}</i><br></br>
            {`Diagnosed by ${entry.specialist}`}
            <Typography
                variant="h6"
                style={{ display: codes.length > 0 ? "" : "none"}}
            >
                Diagnoses
            </Typography>
            {codes.map((code, i) => <div key={i}>{code}</div>)}
            <Typography
                variant="h6"
            >
                Other Info
            </Typography>
            {ExtraInfo}
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
            <HealthCheckEntryForm onSubmit={(ev, entry) => {
                ev.preventDefault();
                console.log(entry);
            }} />
            <Typography variant="h4">{patient.name} {genderIcon}</Typography>
            {`ssn: ${patient.ssn ?? "unknown"}`} <br></br>
            {`occupation: ${patient.occupation}`}
            <Typography variant="h5">Entries</Typography>
            {patient.entries.map(entry => <Entry key={entry.id} entry={entry} />)}
        </Container>
    );

}