import { useState } from "react"

export function useField(type = "text", initialState = "")
{
    const [value, setValue] = useState(initialState)

    const onChange = (event) => {
        setValue(event.target.value)
    }

    function reset()
    {
        setValue(initialState)
    }

    return {
        inputProps: {
            type,
            value,
            onChange,
        },
        reset
    }
}