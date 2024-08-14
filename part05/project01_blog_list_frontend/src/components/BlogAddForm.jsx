import {useState} from "react"

function BlogAddForm({submitAction})
{
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    function passValues(ev)
    {
        submitAction(ev, title, author, url)
    }

    return (
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
            </div>
        </form>
    )

}


export default BlogAddForm