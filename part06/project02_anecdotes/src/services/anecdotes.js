import config from "./config"

import axios from "axios"


const baseUrl = config.baseUrlPrefix+"anecdotes"
function urlWithId(id)
{
    return `${baseUrl}/${id}`
}

async function getAll()
{
    const response = await axios.get(baseUrl)
    return response.data
}

async function createNew(anecdote)
{
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

async function addVote(id)
{
    const idUrl = urlWithId(id)
    const currentState = (await axios.get(idUrl)).data
    const response = await axios.patch(idUrl, { votes: currentState.votes + 1 })
    return response.data
}

export default {
    getAll,
    createNew,
    addVote
}