import config from "./config"

import axios from "axios"


const baseUrl = config.baseUrlPrefix + "anecdotes"
function urlWithId(id)
{
    return baseUrl + "/" + id
}

async function getAll()
{
    const response = await axios.get(baseUrl)
    return response.data
}

async function createNew(anecdote)
{
    const data = { content: anecdote, votes: 0}
    const response = await axios.post(baseUrl, data)
    return response.data
}

async function addVote(anecdote)
{
    const data = { votes: anecdote.votes + 1 }
    const response = await axios.patch(urlWithId(anecdote.id), data)
    return response.data
}

export default {
    getAll,
    createNew,
    addVote
}