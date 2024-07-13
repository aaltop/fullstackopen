const mongoose = require('mongoose')

const num_args = process.argv.length

if (!(num_args === 3 || num_args === 5)) {
    console.log("Usage: node mongo.js <password> [name number]")
    process.exit()
}

const password = process.argv[2]
const url = `mongodb+srv://omistaja:${password}@cluster0.d3vlst5.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.methods.print = function () {
    console.log(`${this.name} ${this.number}`)
}

const Person = mongoose.model('Person', personSchema)


// if only password is given, fetch all people
if (num_args === 3) {
    Person.find().then( result => {
        console.log("Phonebook:")
        result.forEach(person => person.print())
        mongoose.connection.close()
    })
// otherwise add new person to phonebook
} else {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook.`)
        mongoose.connection.close()
    })

}
