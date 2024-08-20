import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

async function addBlog(blog, token)
{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(baseUrl, blog, config)
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
    addLikes: addLikes
}