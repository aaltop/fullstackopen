import { NonSensitivePatient, NewPatient } from "../typing/types";
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


export default router;