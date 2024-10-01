import Input from "./Input"
import loginQuery from "../queries/login"

import { useMutation } from "@apollo/client"




export default function Login({ show })
{
    
    const [login] = useMutation(loginQuery.LOGIN)
    
    if (!show) return null


    async function performLogin(ev)
    {
        ev.preventDefault()

        const { loginUsername, loginPassword } = ev.target

        const ret = await login({ variables: {
            username: loginUsername.value,
            password: loginPassword.value
        }})
        const token = ret.data.login.value
        localStorage.setItem("userToken", token)
    }

    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={performLogin}>
            <Input label={"Username: "} id={"loginUsername"}/><br />
            <Input label={"Password: "} type={"password"} id={"loginPassword"} /><br />
            <input type="submit" value={"Login"}></input>
        </form>
        </div>
    )

}