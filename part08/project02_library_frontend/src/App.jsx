import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import { LoginContext, actions as loginActions } from "./contexts/login"

import { useState, useEffect, useContext } from "react"

const App = () => {
  const [page, setPage] = useState("")
  const [loginState, loginDispatch] = useContext(LoginContext)

  useEffect(() => {
    loginDispatch(loginActions.updateLoginState())
  }, [])

  useEffect(() => {
    setPage("authors")
  }, [loginState.loggedIn])

  const pages = [
    {
        name: "authors",
        show: true
    },
    {
        name: "books",
        show: true
    },
    {
        name: "add book",
        show: loginState.loggedIn
    },
    {
        name: "login",
        show: !loginState.loggedIn
    }
  ]

  const logOutButton = !loginState.loggedIn
    ? null
    : <button onClick={() => loginDispatch(loginActions.logout())}>Log out</button>

  return (
    <div>
      <div>
        {pages.map(({name, show}) => {
            return (
                !show ? null : <button key={name} onClick={() => setPage(name)}>{name}</button>
            )
        })}
        {logOutButton}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add book"} />

      <Login show={page === "login"} />
    </div>
  );
};

export default App;
