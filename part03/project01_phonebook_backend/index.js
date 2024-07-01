const express = require("express")
const morgan = require("morgan")
const cors = require("cors")


const app = express()
// only enable CORS for the development frontend address for now
// app.use(cors({
//     origin: "http://localhost:5173"
// }))
app.use(express.static("dist"))
app.use(express.json())


// Define logging using morgan
// ---------------------------

morgan.token("post_data", (request, response) => {
    return JSON.stringify(request.body)
})


// from the github page for morgan; seems to be the same as "tiny",
// apart from the self-defined token, of course.
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post_data"))

// ============================

let people = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get("/info", (request, response) => {
    response.send(`<div>Phonebook has info for ${people.length} people<br/><br/> ${new Date()}</div>`)
})

// get all
app.get('/api/persons', (request, response) => {
    response.json(people)
})

// get a person with the given id
app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = people.find(person => person.id === id)

    if (person) {

        response.json(person)

    } else {

        response.status(404).end()
    }
})

// post a new person's details to the phonebook
app.post("/api/persons", (request, response) => {

    const personData = request.body

    if (!personData.name) {
        return response.status(400).json({
            error: "name missing"
        })
    }

    if (!personData.number) {
        return response.status(400).json({
            error: "number missing"
        })
    }

    if (people.find(person => person.name === personData.name)) {
        // feels like maybe "409 conflict" makes sense here
        return response.status(409).json({
            error: "a person with the given name already exists in the phonebook"
        })
    }


    personData.id = String(Math.ceil(Math.random()*Number.MAX_SAFE_INTEGER))
    people = people.concat(personData)
    response.json(personData)

})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    people = people.filter(note => note.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}/`)
})

