import blogService from "../services/blogs"

import Blog from "./Blog"

import { UserContext } from "../contexts/UserContext"
import { NotificationContext, notifyWithTimeout } from "../contexts/NotificationContext"

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { useContext } from "react"


export default function BlogList({ username })
{
    const queryClient = useQueryClient()
    const user = useContext(UserContext)[0]
    const notificationDispatch = useContext(NotificationContext)[1]

    const blogsQuery = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const blogs = await blogService.getAll()
            return blogs.toSorted((x, y) => y.likes - x.likes)
        }
    })

    const blogDeleteMutation = useMutation({
        mutationFn: async ({ blog, blogIdx }) => {
            await blogService.deleteBlog(blog, user.token)
            return { blog, blogIdx }
        },
        onSuccess: ({ blog, blogIdx }) => {
            const blogs = queryClient.getQueryData(["blogs"])
            queryClient.setQueryData(
                ["blogs"],
                blogs.filter((_blog, index) => index !== blogIdx)
            )
            notifyWithTimeout(
                notificationDispatch,
                `Deleted "${blog.title}" by ${blog.author}`,
                true,
                5000
            )
        }
    })


    const blogs = blogsQuery.data

    function deleteBlog(blog, blogIdx)
    {
        if (!window.confirm(`Delete "${blog.title}" by ${blog.author}?`)) {
            return false
        }
        blogDeleteMutation.mutate({ blog, blogIdx })
        return true
    }

    function updateBlog(newBlog, blogIdx)
    {
        queryClient.setQueryData(
            ["blogs"],
            (oldBlogs) => {
                const newBlogs = [...oldBlogs]
                newBlogs[blogIdx] = newBlog
                return newBlogs.toSorted((x, y) => y.likes - x.likes)
            }
        )
    }

    async function addBlogLike(blog, blogIdx)
    {
        const newBlog = await blogService.addLikes(blog.id, blog.likes+1)
        updateBlog(newBlog, blogIdx)
    }


    return (
        <div>
            {blogs?.map( (blog, blogIdx) =>
                <Blog
                    key={ blog.id }
                    blog={ blog }
                    clientUserData={{ username }}
                    deleteBlog={() => deleteBlog(blog, blogIdx)}
                    onLike={() => addBlogLike(blog, blogIdx)}
                />
            )}
        </div>
    )
}