import { useState } from "react"

function LoginForm({ submitAction })
{

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function passValues(ev)
    {
        submitAction(ev, username, password)
    }

    return (

        <form onSubmit={passValues}>
            <div>
                <label htmlFor="login-form-username">Username </label>
                <input
                    type="text"
                    value={username}
                    onChange={ev => setUsername(ev.target.value)}
                    id="login-form-username"
                ></input>
            </div>
            <div>
                <label htmlFor="login-form-password">Password </label>
                <input
                    type="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    id="login-form-password"
                ></input>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default LoginForm