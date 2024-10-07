import { calculateBmi, parseArgs as bmiParse } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

import express from "express";


const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {


    // apparently these should not be anything other than string, despite
    // what TypeScript claims ( I guess I could just isinstance though?)
    const argWeight = req.query.weight as string;
    const argHeight = req.query.height as string;
    if (!argHeight || !argWeight) {
        res.status(400).json({ error: "arguments should be weight > 0.0 and height > 0.0"}).end();
    } else {
        try {
            const { centimeters: height, kilograms: weight} = bmiParse([
                argHeight,
                argWeight
            ]);
            const bmi = calculateBmi(height, weight);
            res.status(200).json({ weight, height, bmi });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({error: error.message}).end();
            }
        }
    }
});


app.get("/exercises", (req, res) => {
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || (daily_exercises as unknown[]).length < 1 || !target) {
        res.status(400).json({ error: "parameters missing"});
        return;
    };

    for (const val of daily_exercises) {
        if (typeof(val) !== "number") {
            res.status(400).json({ error: "malformatted parameters"});
            return;
        }
    };

    if (typeof(target) !== "number") {
        res.status(400).json({ error: "malformatted parameters"});
        return;
    }

    try {
        res.status(200).json(calculateExercises(daily_exercises as number[], target));
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message});
        }
    }
});

const PORT = 4000;

app.listen(4000, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});