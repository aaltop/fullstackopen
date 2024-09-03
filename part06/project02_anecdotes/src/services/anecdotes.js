import config from "./config"

import axios from "axios"


const baseUrl = config.baseUrlPrefix+"anecdotes"


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

export default {
    getAll,
    createNew
}