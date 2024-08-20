import { useState } from "react"


function Notification({ text, success = true })
{

    const successStyle = {
        color: "#111d8c",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: "fit-content"
    }

    const failureStyle = {
        ...successStyle,
        color: "#b5471b"
    }

    if (!text) {
        return
    }

    return (
        <div style={success ? successStyle : failureStyle}>
            {text}
        </div>
    )
}

export default Notification