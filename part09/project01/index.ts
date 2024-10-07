import express from "express"


const app = express()
app.use(express.json())

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!")
})

const PORT = 4000

app.listen(4000, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})