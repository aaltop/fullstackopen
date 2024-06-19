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


function Notification({message, success})
{
    const success_style = {
        color: "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const failure_style = {
        ...success_style,
        color: "red"
    }

    if (message === null)
    {
        return null
    }

    return (
        <div style={success ? success_style : failure_style}>
            {message}
        </div>
    )

    
}


const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')
    const [notification, setNotification] = useState({message: null, success: true})

    useEffect(
        () => { AppBackend.get_all().then(persons => setPersons(persons))},
        []
    )

    // a slight issue is that the notification is reset regardless
    // of when it was previously changed, which means that if
    // it gets changed in between calls to notify, it'll still get
    // reset after 5 seconds
    function notify(message, success=true)
    {
        setNotification({message: message, success: success})
        setTimeout(() => {
            setNotification({message: null, success: true})
        }, 5000);
    }

    function updatePersons(persons)
    {
        // If name already in phonebook, ask to update the number
        if (persons.map(person => person.name).includes(newName)) 
        {

            if (window.confirm(`"${newName}" is already in the phonebook, replace the old number with a new one?`))
            {
                const idx = persons.findIndex(person => person.name === newName)
                // set in backend, notify if already removed (frankly a slightly
                // wacky way of doing it, should just add instead if
                // it's not on the server, and then realistically
                // it would be better to query the status of the person
                // on the server first thing anyway. But then, I guess
                // you still want to confirm whether the number should
                // be changed before updating it anywhere... It's one more
                // backend call vs. conflicting messages to the user.)
                AppBackend
                    .update_person(persons[idx].id, {...persons[idx], number: newNumber})
                    // only update if found on server
                    .then( () => {
                            const newPersons = [...persons]
                            newPersons[idx].number = newNumber
                            console.log(newPersons)
                            setPersons(newPersons)
                            notify(`The number of ${newName} was replaced with ${newNumber}.`)
                        }
                    )
                    // if not found, complain
                    .catch( error => {
                            if (error.response.status === 404)
                            {
                                notify(`"${newName}" has already been deleted from the server.`, false)
                            }
                        }
                    )
            }
            return
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
                    notify(`"${_newPerson.name}" was added to the phonebook.`)
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
        <Notification {...notification} />
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
