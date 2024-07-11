const express = require("express")
const morgan = require("morgan")
// const cors = require("cors")

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

morgan.token("post_data", (request) => {
    return JSON.stringify(request.body)
})


// from the github page for morgan; seems to be the same as "tiny",
// apart from the self-defined token, of course.
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post_data"))

// ============================

// let people = [
//     {
//       "id": "1",
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": "2",
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": "3",
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": "4",
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]


app.get('/', (_, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get("/info", (_, response) => {
    Person.countDocuments().then(numDocs => {
        response.send(`<div>Phonebook has info for ${numDocs} people<br/><br/> ${new Date()}</div>`)
    })
})

// get all
app.get('/api/persons', (_, response) => {
    // I'd imagine it would in some sense be good to just
    // keep a "local" in-memory copy of the server data updated. You'd
    // only get the people data from the server at the start,
    // then keep updating that array as you make updates (so a post
    // of a new person updates the array and sends the new person to
    // the server as well, though not necessarily in that order).
    Person.find().then(result => {
        response.json(result)
    })
})

// get a person with the given id
app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id

    Person.findById(id).then(result => {
        if (result) {
            response.json(result)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
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


    // Actually, the current state of the database should be kept
    // locally consisted on the client side which already does the
    // check for whether the phonebook contains a name, so kind
    // of unnecessary to fiddle with it here? In turn, it's kind of
    // dumb anyway that you can't have the same name twice. I mean,
    // people can have two or more phones/numbers, and preventing
    // the addition of the same name twice is just extra work for the
    // developer while restricting the user unnecessarily.

    // if (Person.findOne({name: personData.name})) {
    //     // feels like maybe "409 conflict" makes sense here
    //     return response.status(409).json({
    //         error: "a person with the given name already exists in the phonebook"
    //     })
    // }

    const person = new Person({
        name: personData.name,
        number: personData.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

})

app.put("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    const newNumber = request.body.number

    Person.findByIdAndUpdate(id, { number: newNumber }).then(result => {
        // turns out this findBy doesn't error if nothing's found,
        // which is fair, but still need to make it work like originally.
        // I suppose. So, return 404 if the result is null
        if (result === null) {
            return response.status(404).end()
        }
        response.status(204).end()
    }).catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id

    Person.findByIdAndDelete(id).then(() => {
        response.status(204).end()
    }).catch(error => next(error))
})

function errorHandler(error, request, response)
{
    if (error.name === "CastError") {
        return response.status(400).send({ error: 'malformatted id' })
    }
    console.log("Error occured, giving catch-all 500")
    response.status(500).end()
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})

