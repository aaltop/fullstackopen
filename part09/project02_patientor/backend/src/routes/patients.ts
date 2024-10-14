import { NonSensitivePatient, NewPatient, ErrorResponse, Patient } from "../typing/types";
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

router.route("/:id")
    .get((req: Request, res: Response<Patient | ErrorResponse>) => {
        const id: string = req.params.id;
        const foundPatient: Patient | null = patientService.getPatient(id, false);
        if (foundPatient === null) {
            res.status(404).json({ error: `Patient with id '${id}' not found.` }).end();
            return;
        }
        res.json(foundPatient);
    });


export default router;