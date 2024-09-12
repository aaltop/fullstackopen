import blogService from "../services/blogs"
import blogsQueries from "../queries/blogs"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

export default function BlogComments({
    blog,
    submitComment,
}) {
    const [comment, setComment] = useState("")
    const queryClient = useQueryClient()

    submitComment ??= async (ev, comment) => {
        ev.preventDefault()
        const newBlog = await blogService.addComment(
            blog.id,
            comment
        )

        queryClient.setQueryData(
            blogsQueries.queryBlog(blog.id).queryKey,
            old => newBlog
        )
        setComment("")
    }

    return (
        <div>
            <h2>Comments ({blog.comments.length})</h2>
            <form
                onSubmit={ev => submitComment(ev, comment)}
            >
                <label htmlFor="blog-comments-comment-input">
                    Add Comment{" "}
                </label>
                <input
                    type="text"
                    value={comment}
                    onChange={ev =>
                        setComment(ev.target.value)
                    }
                    id="blog-comments-comment-input"
                ></input>
                <button type="submit">Send</button>
            </form>
            <div>
                <ul>
                    {blog.comments.map((comm, i) => (
                        <li key={i}>{comm}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
