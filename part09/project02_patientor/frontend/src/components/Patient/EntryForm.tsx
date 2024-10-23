import { FormProps } from "../formUtils";
import HospitalEntryForm from "./HospitalEntryForm";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";
import parsers from "../../typing/parsers";

import { useState } from "react";
import { MenuItem, Select } from "@mui/material";

export default function EntryForm(props: FormProps)
{
    const [type, setType] = useState("");

    const selectComp = (
        <>
            <Select
                value={type}
                fullWidth
                label="Entry type"
                onChange={ev => setType(ev.target.value)}
            >
                {parsers.EntryTypeEnum.options.map(entryType => (
                    <MenuItem
                        key={entryType}
                        id={entryType}
                        value={entryType}
                    >
                        {entryType}
                    </MenuItem>
                ))}

            </Select>
        </>
    );

    switch (type) {
        case "Hospital": {
            return (
                <>
                 {selectComp}
                 <HospitalEntryForm {...props} />
                </>
            );
        } case "OccupationalHealthcare": {
            return (
                <>
                 {selectComp}
                 <OccupationalHealthcareEntryForm {...props} />
                </>
            );
        } case "HealthCheck": {
            return (
                <>
                 {selectComp}
                 <HealthCheckEntryForm {...props} />
                </>
            );
        }
        default:
            return selectComp;
    }
}