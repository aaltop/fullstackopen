// local imports
// ---------------------

import blogService from "../services/blogs"

import {
    NotificationContext,
    notifyWithTimeout,
} from "../contexts/NotificationContext"

import { FlexDiv } from "../style/div"

// =========================

import { useState, useContext } from "react"
import {
    useQueryClient,
    useMutation,
} from "@tanstack/react-query"

function BlogAddForm({ user }) {
    const queryClient = useQueryClient()
    const notificationDispatch = useContext(
        NotificationContext
    )[1]

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const [visible, setVisible] = useState(false)

    const addBlogMutation = useMutation({
        mutationFn: async ({ blog, user }) => {
            return await blogService.addBlog(blog, user)
        },
        onSuccess: data => {
            // is this an issue if there are no blogs? And it
            // also assumes that the query key is defined.
            const blogs = queryClient.getQueryData([
                "blogs",
            ])
            // TODO: find a good way to do this. Ideally,
            // getting or setting the query data of "blogs" should always
            // automatically perform the sorting, and the only thing
            // that the user does is pass the new list of blogs
            const newBlogs = blogs
                .concat(data)
                .toSorted((x, y) => y.likes - x.likes)
            queryClient.setQueryData(["blogs"], newBlogs)
            notifyWithTimeout(
                notificationDispatch,
                `Added new blog "${title}" from ${author}`,
                true,
                5000
            )
        },
        onError: e => {
            if (
                e.name === "AxiosError" &&
                e.response.status === 400
            ) {
                notifyWithTimeout(
                    notificationDispatch,
                    e.response.data.error,
                    false,
                    5000
                )
            }
        },
    })

    async function AddBlog(ev, title, author, url) {
        ev.preventDefault()
        const blog = { title, author, url }
        addBlogMutation.mutate({ blog, user })
    }

    async function passValues(ev) {
        const success = await AddBlog(
            ev,
            title,
            author,
            url
        )
        setVisible(!success)
    }

    return (
        <>
            <div style={{ display: visible ? "none" : "" }}>
                <button
                    type="button"
                    onClick={() => setVisible(true)}
                >
                    New Blog
                </button>
            </div>
            <FlexDiv
                style={{ display: visible ? "" : "none" }}
            >
                <form onSubmit={passValues}>
                    <div>
                        <label htmlFor="blog-add-form-title-input">
                            Title
                        </label>{" "}
                        <input
                            type="text"
                            value={title}
                            onChange={ev =>
                                setTitle(ev.target.value)
                            }
                            id="blog-add-form-title-input"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="blog-add-form-author-input">
                            Author
                        </label>{" "}
                        <input
                            type="text"
                            value={author}
                            onChange={ev =>
                                setAuthor(ev.target.value)
                            }
                            id="blog-add-form-author-input"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="blog-add-form-url-input">
                            Url
                        </label>{" "}
                        <input
                            type="text"
                            value={url}
                            onChange={ev =>
                                setUrl(ev.target.value)
                            }
                            id="blog-add-form-url-input"
                        ></input>
                    </div>
                    <div>
                        <button type="submit">
                            Add Blog
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setVisible(false)
                            }
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </FlexDiv>
        </>
    )
}

export default BlogAddForm
