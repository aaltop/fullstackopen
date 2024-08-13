import {useState} from "react"

function LoginForm({submitAction})
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
                <input
                    type="text" 
                    value={username} 
                    onChange={ev => setUsername(ev.target.value)}
                ></input>
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                ></input>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default LoginForm