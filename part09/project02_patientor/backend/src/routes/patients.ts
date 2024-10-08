import { NonSensitivePatient } from "../types";
import patientService from "../services/patients";

import express, { Response } from "express";
import cors from "cors";

const router = express.Router();

router.use(
    express.json(),
    cors()
);

router.route("/")
    .get((_req, res: Response<NonSensitivePatient[]>) => {
        res.json(patientService.getAll());
    });


export default router;