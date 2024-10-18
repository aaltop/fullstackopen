import { NonSensitivePatient, NewPatient, ErrorResponse, Patient, Entry, NewEntry} from "../typing/types";
import patientService from "../services/patients";
import parsers from "../typing/parsers";

import express, { Response, Request } from "express";
import cors from "cors";

const router = express.Router();

router.use(
    express.json(),
    cors()
);

router.route("/")
    .get((_req, res: Response<NonSensitivePatient[]>) => {
        res.json(patientService.getAll());
    })
    .post((req: Request, res: Response<NonSensitivePatient>) => {
        const newPatient: NewPatient = parsers.NewPatient.parse(req.body);
        res.json(patientService.addPatient(newPatient));
    });

function invalidIdMessage(id: string): { error: string }
{
    return {
        error: `Patient with id '${id}' not found.`
    };
}

router.route("/:id")
    .get((req: Request, res: Response<Patient | ErrorResponse>) => {
        const id: string = req.params.id;
        const foundPatient: Patient | null = patientService.getPatient(id, false);
        if (foundPatient === null) {
            res.status(404).json(invalidIdMessage(id)).end();
            return;
        }
        res.json(foundPatient);
    });

router.route("/:id/entries")
    .post((req: Request, res: Response<Entry | ErrorResponse>) => {
        const id = req.params.id;
        const parsedData = parsers.NewEntryUnion.safeParse(req.body);

        if (!parsedData.success) {
            res.status(400).json({ error: "Sent data did not parse correctly."}).end();
            return;
        }

        const entry: NewEntry = parsedData.data;
        const entryData = patientService.addEntry(id, entry);
        if (entryData === null) {
            res.status(404).json(invalidIdMessage(id)).end();
            return;
        }
        res.json(entryData);
    });


export default router;