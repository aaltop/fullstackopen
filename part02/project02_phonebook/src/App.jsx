import { useState } from 'react'

function Contact({person})
{
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
        </tr>
    )
}


function ContactListing({persons})
{

    function map_func(person)
    {
        return <Contact key={person.name} person={person} />
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Person</th>
                <th>Number</th>
            </tr>
            </thead>
            <tbody>
                {persons.map(map_func)}
            </tbody>
        </table>
    )
}



const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: "040-1234567"}
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    function updatePersons(_persons)
    {
        // do not add if name already in phonebook
        if (_persons.map(person => person.name).includes(newName)) {
            alert(`"${newName}" has already been added to the phonebook`)
            // I think here it is actually correct to return the
            // same object, because it has not changed?
            return _persons
        }
        const newPerson = {name: newName, number: newNumber}
        const newPersons = _persons.concat(newPerson)
        console.log(newPersons)
        return newPersons
    }

    function handleSubmitNewContact(ev)
    {
        ev.preventDefault()
        // use updater function so logging current state works
        // nicely
        setPersons(updatePersons)
    }

    return (
        <div>
        <h1>Phonebook</h1>
        <div>
            filter shown with <input
                name="filter"
            />
        </div>
        <h2>Add new</h2>
        <form onSubmit={handleSubmitNewContact}>
            <div>
                name: <input 
                    name="new name" 
                    value={newName}
                    onChange={ev => setNewName(ev.target.value)}
                />
            </div>
            <div>
                number: <input
                    name="new number"
                    value={newNumber}
                    onChange={ev => setNewNumber(ev.target.value)}
                />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        <h2>Numbers</h2>
        <ContactListing persons={persons} />
        </div>
    )
}

export default App
