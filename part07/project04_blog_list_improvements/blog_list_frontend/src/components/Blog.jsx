import { lightMode as color } from "../style/color"
import { UserContext } from "../contexts/UserContext"
import blogsQueries from "../queries/blogs"
import {
    NotificationContext,
    notifyWithTimeout,
} from "../contexts/NotificationContext"
import blogService from "../services/blogs"

import PropTypes from "prop-types"
import {
    useQueryClient,
    useQuery,
    useMutation,
} from "@tanstack/react-query"
import { useContext } from "react"
import {
    useNavigate,
    useLoaderData,
} from "react-router-dom"

function Blog({ blog, onDelete, onLike }) {
    // Hooks
    // -------------
    const user = useContext(UserContext)[0]

    const queryClient = useQueryClient()
    const notificationDispatch = useContext(
        NotificationContext
    )[1]

    const blogQuery = useQuery(
        blogsQueries.queryBlog(useLoaderData())
    )
    const navigate = useNavigate()

    const blogDeleteMutation = useMutation({
        mutationFn: async ({ blog }) => {
            await blogService.deleteBlog(blog, user.token)
            return { blog }
        },
        onSuccess: ({ blog }) => {
            notifyWithTimeout(
                notificationDispatch,
                `Deleted "${blog.title}" by ${blog.author}`,
                true,
                5000
            )

            // get back to the main view, which SHOULD be the blogs view
            navigate("/")
        },
    })

    // =======================

    if (!blogQuery.isSuccess) return null

    blog = blog ?? blogQuery.data

    function deleteBlog(ev) {
        if (
            !window.confirm(
                `Delete "${blog.title}" by ${blog.author}?`
            )
        ) {
            return false
        }
        blogDeleteMutation.mutate({ blog })
        return true
    }

    async function addBlogLike(ev) {
        const newBlog = await blogService.addLikes(
            blog.id,
            blog.likes + 1
        )
        queryClient.setQueryData(
            blogsQueries.queryBlog(blog.id).queryKey,
            old => newBlog
        )
    }

    const displayDelete = blog.user
        ? blog.user.username === user.username
        : false

    const fullStyle = {
        outlineWidth: "thin",
        outlineStyle: "solid",
        outlineColor: color.blogOutline,
        width: "fit-content",
        margin: "10px",
        padding: "5px",
        flexDirection: "row",
        justifyItems: "end", // Huh? this is supposed to be "ignored" by flex, but it's not?
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "20px",
    }

    const full = (
        <div
            style={fullStyle}
            className="blog-verbose-view"
        >
            <div>
                <div>{blog.title}</div>
                <div>{blog.url}</div>
                <div>
                    likes {blog.likes}
                    <button
                        type="button"
                        style={{ margin: "5px" }}
                        onClick={onLike ?? addBlogLike}
                    >
                        like
                    </button>
                </div>
                <div>{blog.author}</div>
                <div
                    style={{
                        display: displayDelete
                            ? ""
                            : "none",
                    }}
                >
                    <button
                        type="button"
                        onClick={onDelete ?? deleteBlog}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )

    return full
}

Blog.propTypes = {
    blog: PropTypes.object,
    onDelete: PropTypes.func,
    onLike: PropTypes.func,
}

export default Blog
