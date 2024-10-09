import { NonSensitivePatient, NewPatient } from "../types";
import patientService from "../services/patients";

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
    .post((req: Request<unknown, unknown, NewPatient>, res: Response<NonSensitivePatient>) => {
        const newPatient: NewPatient = req.body;
        res.json(patientService.addPatient(newPatient));
    });


export default router;