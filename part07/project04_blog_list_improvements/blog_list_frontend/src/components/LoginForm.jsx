import { Button } from "../style/button"
import { FormDiv } from "../style/div"

import { useState } from "react"

function LoginForm({ submitAction }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function passValues(ev) {
        submitAction(ev, username, password)
    }

    return (
        <FormDiv as="form" onSubmit={passValues}>
            <label htmlFor="login-form-username">
                Username{" "}
            </label>
            <input
                type="text"
                value={username}
                onChange={ev =>
                    setUsername(ev.target.value)
                }
                id="login-form-username"
            ></input>
            <label htmlFor="login-form-password">
                Password{" "}
            </label>
            <input
                type="password"
                value={password}
                onChange={ev =>
                    setPassword(ev.target.value)
                }
                id="login-form-password"
            ></input>
            <Button type="submit">Login</Button>
        </FormDiv>
    )
}

export default LoginForm
