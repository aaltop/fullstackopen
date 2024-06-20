import axios from "axios"



const countries_url = "https://studies.cs.helsinki.fi/restcountries/api/all"

/**
 * Get the list of countries. Returns a promise whose value will be the
 * response's data part.
 */
function get_all()
{
    return axios.get(countries_url).then(response => response.data)
}

export default {get_all}