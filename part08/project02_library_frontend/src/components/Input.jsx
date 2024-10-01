import { useState } from "react"




export default function Input({ label, type = "text", id } = {})
{
    const [value, setValue] = useState("")

    return <label>
        {label}
        <input
            type={type}
            value={value}
            onChange={ev => setValue(ev.target.value)}
            id={id}
        >
        </input>
    </label>
}