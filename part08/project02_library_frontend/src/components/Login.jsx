import Input from "./Input"
import userQuery from "../queries/user"
import loginActions from "../loginState"

import { useMutation, useApolloClient } from "@apollo/client"



export default function Login({ show, setPage })
{
    
    const [login] = useMutation(userQuery.LOGIN)
    const apolloClient = useApolloClient()
    
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
        loginActions.login(token)
        apolloClient.resetStore()
        setPage()
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