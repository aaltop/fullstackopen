import blogsQueries from "../queries/blogs"
import { lightMode as color } from "../style/color"

import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export default function BlogList() {
    const blogsQuery = useQuery(blogsQueries.queryBlogs())

    const blogs = blogsQuery.data

    const blogStyle = {
        outlineWidth: "thin",
        outlineStyle: "solid",
        outlineColor: color.blogOutline,
        width: "fit-content",
        margin: "10px",
        padding: "5px",
        display: "flex",
        flexDirection: "row",
        justifyItems: "end", // Huh? this is supposed to be "ignored" by flex, but it's not?
    }

    return (
        <div>
            {blogs?.map((blog, blogIdx) => (
                <div style={blogStyle} key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title}
                    </Link>
                </div>
            ))}
        </div>
    )
}
