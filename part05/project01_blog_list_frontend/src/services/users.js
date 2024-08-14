import axios from "axios"

const baseUrl = "/api/users"


async function getAll()
{
    const response = await axios.get(baseUrl)
    return response.data
}

async function getUser(username, token)
{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${baseUrl}/${username}`, config)
    return response.data
}

export default {
    getAll: getAll,
    getUser: getUser
}