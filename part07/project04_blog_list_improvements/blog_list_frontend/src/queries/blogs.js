import blogService from "../services/blogs"

const baseKey = ["blogs"]

function queryBlogs() {
    return {
        queryKey: baseKey,
        queryFn: async () => {
            const blogs = await blogService.getAll()
            return blogs.toSorted(
                (x, y) => y.likes - x.likes
            )
        },
    }
}

function queryBlog(id) {
    return {
        queryKey: baseKey.concat([id]),
        queryFn: async () => {
            const blogs = await blogService.getAll()
            return blogs.find(blog => blog.id === id)
        },
    }
}

const blogsQueries = {
    queryBlogs,
    queryBlog,
}
export default blogsQueries
