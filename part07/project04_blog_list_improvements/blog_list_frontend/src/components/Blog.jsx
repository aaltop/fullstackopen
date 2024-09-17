// Local imports
// -----------------
import { UserContext } from "../contexts/UserContext"
import blogsQueries from "../queries/blogs"
import {
    NotificationContext,
    notifyWithTimeout,
} from "../contexts/NotificationContext"
import blogService from "../services/blogs"
import BlogComments from "./BlogComments"

import { Link } from "../style/link"
import { GridDiv } from "../style/div"
import { Button } from "../style/button"
// =========================

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
import styled from "styled-components"

const BlogDiv = styled(GridDiv)`
    margin: 10px;
    padding: 5px;
    gap: 0.5em;

    border-block: 1px solid #999;
`

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

    const full = (
        <BlogDiv>
            <h1>{blog.title}</h1>
            <Link to={blog.url}>{blog.url}</Link>
            <div>
                {blog.likes} likes
                <Button
                    type="button"
                    style={{ margin: "5px" }}
                    onClick={onLike ?? addBlogLike}
                >
                    like
                </Button>
            </div>
            by {blog.author}
            <div
                style={{
                    display: displayDelete ? "" : "none",
                }}
            >
                <Button
                    type="button"
                    onClick={onDelete ?? deleteBlog}
                >
                    Delete
                </Button>
            </div>
        </BlogDiv>
    )

    const blogAndComments = (
        <div>
            {full}
            <BlogComments blog={blog} />
        </div>
    )

    return blogAndComments
}

Blog.propTypes = {
    blog: PropTypes.object,
    onDelete: PropTypes.func,
    onLike: PropTypes.func,
}

export default Blog
