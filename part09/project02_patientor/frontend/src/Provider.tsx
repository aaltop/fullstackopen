import { Diagnosis } from "./typing/types";
import diagnosisService from "./services/diagnoses";
import { DiagnosesContext } from "./contexts";

import { PropsWithChildren, useEffect, useState } from "react";




function DiagnosisProvider(props: PropsWithChildren)
{
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        async function fetchDiagnoses()
        {
            const data = await diagnosisService.getAll();
            setDiagnoses(data);
        }
        fetchDiagnoses();
    }, []);


    return (
        <DiagnosesContext.Provider value={diagnoses}>
            {props.children}
        </DiagnosesContext.Provider>
    );
}


export default function Provider(props: PropsWithChildren)
{
    return (
        <DiagnosisProvider>
            {props.children}
        </DiagnosisProvider>
    );
}