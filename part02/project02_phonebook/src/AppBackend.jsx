import axios from "axios"



const persons_url = "http://localhost:3001/persons"

/**
 * Post a new person to the backend. Returns a promise whose
 * value will be the response's data part.
 */
function add_person(person)
{
    return axios.post(persons_url, person).then(response => {response.data})
}

/**
 * Get the list of people. Returns a promise whose value will be
 * the array of people.
 */
function get_all()
{
    return axios.get(persons_url).then(response => response.data)
}


export default {add_person, get_all}