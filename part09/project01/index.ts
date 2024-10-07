import { calculateBmi, parseArgs as bmiParse } from "./bmiCalculator"

import express from "express"


const app = express()
app.use(express.json())

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!")
})

app.get("/bmi", (req, res) => {


    const { weight: argWeight, height: argHeight } = req.query
    if (!argHeight || !argWeight) {
        res.status(400).json({ error: "arguments should be weight > 0.0 and height > 0.0"}).end()
    } else {
        try {
            const { centimeters: height, kilograms: weight} = bmiParse([
                argHeight.toString(),
                argWeight.toString()
            ])
            const bmi = calculateBmi(height, weight)
            res.status(200).json({ weight, height, bmi })
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({error: error.message}).end()
            }
        }
    }
})

const PORT = 4000

app.listen(4000, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})