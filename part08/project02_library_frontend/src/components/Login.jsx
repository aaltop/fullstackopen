import Input from "./Input"
import userQuery from "../queries/user"
import { LoginContext, actions as loginActions} from "../contexts/login"

import { useMutation } from "@apollo/client"
import { useContext } from "react"



export default function Login({ show })
{
    
    const [login] = useMutation(userQuery.LOGIN)
    const [_loginState, loginDispatch] = useContext(LoginContext)
    
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
        loginDispatch(loginActions.login(token))
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