import {lightMode as color} from "../style/color"

import {useState} from "react"


function Blog({ blog }) {

    const [verbose, setVerbose] = useState(false)

    const simpleStyle = {
        outlineWidth: "thin",
        outlineStyle: "solid",
        outlineColor: color.blogOutline,
        width: "fit-content",
        margin: "10px",
        padding: "5px"
    }

    const simple = (
        <div style={simpleStyle}>
            {blog.title} {blog.author} <button type="button" onClick={() => setVerbose(true)}>Show</button>
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
                    likes {blog.likes} <button type="button">like</button>
                </div>
                <div>
                    {blog.author}
                </div>
            </div>
            <div>
                <button type="button" onClick={() => setVerbose(false)}>Hide</button>
            </div>
        </div>
    )

    return full
}

export default Blog