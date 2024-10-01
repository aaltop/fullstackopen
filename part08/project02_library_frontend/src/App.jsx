import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import BooksRecommendations from "./components/BooksRecommendations"

import { LoginContext, actions as loginActions } from "./contexts/login"
import userQuery from "./queries/user"

import { useState, useEffect, useContext } from "react"
import { useQuery } from "@apollo/client"

const App = () => {
  const [page, setPage] = useState("")
  const [loginState, loginDispatch] = useContext(LoginContext)
  const queriedUser = useQuery(userQuery.GET_USER)

  useEffect(() => {
    loginDispatch(loginActions.updateLoginState())
  }, [])

  useEffect(() => {
    setPage("authors")
  }, [loginState.loggedIn])

  if (queriedUser.loading) return <>Loading...</>
  if (queriedUser.error) return <>Error: {queriedUser.error.message}</>


  const userData = queriedUser.data.me

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
        name: "recommendations",
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

      <BooksRecommendations
        userData={userData}
        show={page === "recommendations"}
      />

      <Login show={page === "login"} />
    </div>
  );
};

export default App;
