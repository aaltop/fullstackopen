import axios from "axios"
const baseUrl = "/api/blogs"

function authHeader(token)
{
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}


async function getAll()
{
    const request = await axios.get(baseUrl)
    return request.data
}

async function addBlog(blog, token)
{
    const config = authHeader(token)
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

async function deleteBlog(blog, token)
{
    const config = authHeader(token)
    const response = await axios.delete(baseUrl + "/" + blog.id, config)
    return response.data
}


async function addLikes(blogId, newLikesCount)
{

    const response = await axios.patch(baseUrl + "/" + blogId, { likes: newLikesCount })
    return response.data
}


export default {
    getAll: getAll,
    addBlog: addBlog,
    deleteBlog: deleteBlog,
    addLikes: addLikes
}