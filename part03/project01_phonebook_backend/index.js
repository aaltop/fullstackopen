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
app.post("/api/persons", (request, response, next) => {

    const personData = request.body

    // if (personData.name === undefined) {
    //     return response.status(400).json({
    //         error: "name missing"
    //     })
    // }

    // if (personData.number === undefined) {
    //     return response.status(400).json({
    //         error: "number missing"
    //     })
    // }

    const person = new Person({
        name: personData.name,
        number: personData.number
    })


    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => {
        next(error)
    })
})

app.put("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    const newNumber = request.body.number

    Person.findByIdAndUpdate(id, { number: newNumber }, { runValidators: true }).then(result => {
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

// SORRY, WHAT? I'm not using next, yet if I get rid of it, this
// stops working? EDIT: Oh, apparently Express uses the calling convention
// to determine what is and isn't an error handler? If so, that is some
// supremely idiotic design, though what do I know. Either way, I can't
// actually find (with a quick look through the docs and interwebs) any
// info on this, expect for like https://stackoverflow.com/questions/77485936/why-does-the-4th-argument-in-my-express-middleware-function-only-break-it-in-cer
// The Express docs don't seem to tell this anywhere (I mean, they probably do,
// but it feels like very front-and-center information, yet I'm having trouble
// finding it). Thanks, Express devs.
function errorHandler(error, request, response, _next)
{
    if (error.name === "CastError") {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }


    console.log("Error occured, giving catch-all 500")
    response.status(500).end()
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})

