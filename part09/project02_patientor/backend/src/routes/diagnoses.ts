import diagnosisService from "../services/diagnoses";
import { Diagnosis } from "../typing/types";

import express, { Response } from "express";
import cors from "cors";


const router = express.Router();

router.use(
    express.json(),
    cors()
);

router.route("/")
    .get((_req, res: Response<Diagnosis[]>) => {
        res.json(diagnosisService.getAll());
    });

export default router;