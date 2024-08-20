import { useState } from "react"

function BlogAddForm({ submitAction })
{
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const [visible, setVisible] = useState(false)

    async function passValues(ev)
    {
        const success = await submitAction(ev, title, author, url)
        setVisible(!success)
    }

    return (
        <div>
            <div style={{ display: visible ? "none" : "" }}>
                <button type="button" onClick={() => setVisible(true)}>New Blog</button>
            </div>
            <div style={{ display: visible ? "" : "none" }}>
                <form onSubmit={passValues}>
                    <div>
                        Title <input
                            type="text"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                        ></input>
                    </div>
                    <div>
                        Author <input
                            type="text"
                            value={author}
                            onChange={ev => setAuthor(ev.target.value)}
                        ></input>
                    </div>
                    <div>
                        Url <input
                            type="text"
                            value={url}
                            onChange={ev => setUrl(ev.target.value)}
                        ></input>
                    </div>
                    <div>
                        <button type="submit">Add Blog</button>
                        <button type="button" onClick={() => setVisible(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )

}


export default BlogAddForm