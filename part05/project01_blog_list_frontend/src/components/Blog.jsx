import { lightMode as color } from "../style/color"
import blogService from "../services/blogs"

import { useState } from "react"
import PropTypes from "prop-types"



function Blog({ blog, clientUserData, updateBlog, deleteBlog }) {

    const [verbose, setVerbose] = useState(false)

    const simpleStyle = {
        outlineWidth: "thin",
        outlineStyle: "solid",
        outlineColor: color.blogOutline,
        width: "fit-content",
        margin: "10px",
        padding: "5px",
        display: "flex",
        flexDirection: "row",
        justifyItems: "end" // Huh? this is supposed to be "ignored" by flex, but it's not?
    }

    const displayDelete = blog.user
        ? (blog.user.username === clientUserData.username)
        : false

    const simple = (
        <div style={simpleStyle}>
            <div>
                {blog.title} {blog.author}
            </div>
            <div>
                <button type="button" onClick={() => setVerbose(true)}>Show</button>
            </div>
        </div>
    )

    if (!verbose) {
        return simple
    }

    const fullStyle = {
        ...simpleStyle,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "20px",
    }

    const full = (
        <div style={fullStyle}>
            <div>
                <div>
                    {blog.title}
                </div>
                <div>
                    {blog.url}
                </div>
                <div>
                    likes {blog.likes}
                    <button
                        type="button"
                        style={{ margin: "5px" }}
                        onClick={async () => {
                            const newBlog = await blogService.addLikes(blog.id, blog.likes+1)
                            updateBlog(newBlog)
                        }}
                    >
                        like
                    </button>
                </div>
                <div>
                    {blog.author}
                </div>
                <div style={{ display: displayDelete ? "" : "none" }}>
                    <button type="button" onClick={ deleteBlog }>Delete</button>
                </div>
            </div>
            <div>
                <button type="button" onClick={() => setVerbose(false)}>Hide</button>
            </div>
        </div>
    )

    return full
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    clientUserData: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
}

export default Blog