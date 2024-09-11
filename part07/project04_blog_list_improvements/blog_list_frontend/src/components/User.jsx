import userQueries from "../queries/users"

import { useLoaderData } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

export default function User() {
    const usersQuery = useQuery(userQueries.queryUsers())
    const userId = useLoaderData()

    if (!usersQuery.isSuccess) return null
    const users = usersQuery.data

    const user = users.find(us => us.id === userId)
    return (
        <div>
            <h1>{user.name}</h1>
            <h2>Added Blogs</h2>
            <ul>
                {user.blogs.map(blog => {
                    return (
                        <li key={blog.id}>{blog.title}</li>
                    )
                })}
            </ul>
        </div>
    )
}
