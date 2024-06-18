import { useState, useEffect } from 'react'
import axios from "axios"
import AppBackend from './AppBackend'



function Contact({person, on_delete})
{

    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button type="button" onClick={ev => on_delete(person, ev)}>Delete</button></td>
        </tr>
    )
}


function ContactListing({persons, on_person_delete})
{

    function map_func(person)
    {
        return <Contact key={person.id} person={person} on_delete={on_person_delete} />
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Person</th>
                <th>Number</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {persons.map(map_func)}
            </tbody>
        </table>
    )
}

// feels quite superfluous like this as it doesn't really add
// any functionality to the base input element, but
// it's the third required extracted component
function Input({info, value, onChange})
{
    return (
        <>
        {info} <input 
            value={value}
            onChange={onChange}
        />
        </>
    )
}



const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    useEffect(
        () => { AppBackend.get_all().then(persons => setPersons(persons))},
        []
    )

    function updatePersons(persons)
    {
        // do not add if name already in phonebook
        if (persons.map(person => person.name).includes(newName)) {
            alert(`"${newName}" has already been added to the phonebook`)
            // I think here it is actually correct to return the
            // same object, because it has not changed?
            return persons
        }
        const newPerson = {name: newName, number: newNumber}
        const newPersons = [...persons]
        AppBackend.add_person(newPerson)
            .then(
                _newPerson => {
                    console.log("new person:", _newPerson)
                    newPersons.push(_newPerson)
                    console.log(newPersons)
                    setPersons(newPersons)
                }
            )
    }

    function delete_person(person, ev)
    {
        if (window.confirm(`Delete contact ${person.name}?`))
        {
            AppBackend.delete_person(person.id).then(response => console.log(response))
            setPersons(persons.filter(cur_person => cur_person.id !== person.id))
            
        }
    }

    function handleSubmitNewContact(ev)
    {
        ev.preventDefault()
        // use updater function so logging current state works
        // nicely
        updatePersons(persons)
    }

    function filterName(_persons)
    {
        console.log("name filter:", nameFilter)
        // don't filter if the filter input is empty
        if ("" === nameFilter) {
            return _persons
        }
        return _persons.filter(
            person => person.name.toLowerCase().includes(nameFilter)
        )
    }

    return (
        <div>
        <h1>Phonebook</h1>
        <div>
            <Input 
                info="filter shown with (case insensitive)"
                value={nameFilter}
                onChange={ev => setNameFilter(ev.target.value.toLowerCase())}
            />
        </div>
        <h2>Add new</h2>
        <form onSubmit={handleSubmitNewContact}>
            <div>
                <Input
                    info="name:"
                    value={newName}
                    onChange={ev => setNewName(ev.target.value)}
                />
            </div>
            <div>
                <Input
                    info="number:"
                    value={newNumber}
                    onChange={ev => setNewNumber(ev.target.value)}
                />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        <h2>Numbers</h2>
        <ContactListing persons={filterName(persons)} on_person_delete={delete_person} />
        </div>
    )
}

export default App
