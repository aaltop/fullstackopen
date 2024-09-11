import { UserContext } from "../contexts/UserContext"

import BlogAddForm from "./BlogAddForm"
import BlogList from "./BlogList"

import { useContext } from "react"

export default function BlogsView() {
    const user = useContext(UserContext)[0]

    return (
        <div>
            <h2>Add new blog</h2>
            <BlogAddForm user={user.token} />
            <h2>Blogs</h2>
            <BlogList username={user.username} />
        </div>
    )
}
