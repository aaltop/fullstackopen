import axios from "axios"

const baseUrl = "/api/login"

async function login(username, password)
{
    try {
        const response = await axios.post(baseUrl, { username, password })
        return response.data.token
    } catch (error) {
        if (error.name === "AxiosError" && error.response.status === 401) {
            return null
        } else {
            throw error
        }

    }

}

export default { login }