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
                        <label htmlFor="blog-add-form-title-input">Title</label> <input
                            type="text"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                            id="blog-add-form-title-input"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="blog-add-form-author-input">Author</label> <input
                            type="text"
                            value={author}
                            onChange={ev => setAuthor(ev.target.value)}
                            id="blog-add-form-author-input"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="blog-add-form-url-input">Url</label> <input
                            type="text"
                            value={url}
                            onChange={ev => setUrl(ev.target.value)}
                            id="blog-add-form-url-input"
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