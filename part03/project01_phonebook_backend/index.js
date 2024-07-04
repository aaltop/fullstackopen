const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const Person = require("./models/person")


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
    // I'd imagine it would in some sense be good to just
    // keep a "local" in-memory copy of the server data updated. You'd
    // only get the people data from the server at the start,
    // then keep updating that array as you make updates (so a post
    // of a new person updates the array and sends the new person to
    // the server as well, though not necessarily in that order).
    Person.find().then(result => {
        people = result
        response.json(result)
    })
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

    if (personData.name === undefined) {
        return response.status(400).json({
            error: "name missing"
        })
    }

    if (personData.number === undefined) {
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

    const person = new Person({
        name: personData.name,
        number: personData.number
    })

    person.save().then(savedPerson => {
        people = people.concat(savedPerson)
        response.json(savedPerson)
    })

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

