import axios from "axios"



const persons_url = "http://localhost:3001/api/persons"

/**
 * Return the URL that points to the person with id `person_id`.
 */
function person_url(person_id)
{
    return `${persons_url}/${person_id}`
}

/**
 * Post a new person to the backend. Returns a promise whose
 * value will be the response's data part.
 */
function add_person(person)
{
    return axios.post(persons_url, person).then(response => response.data)
}

function delete_person(person_id)
{
    return axios.delete(person_url(person_id))
}

function update_person(person_id, new_data)
{
    return axios.put(person_url(person_id), new_data)
}

/**
 * Get the list of people. Returns a promise whose value will be
 * the array of people.
 */
function get_all()
{
    return axios.get(persons_url).then(response => response.data)
}


export default {add_person, get_all, delete_person, update_person}