import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import { LoginContext, actions as loginActions } from "./contexts/login"

import { useState, useEffect, useContext } from "react"

const App = () => {
  const [page, setPage] = useState("authors")
  const [loginState, loginDispatch] = useContext(LoginContext)

  useEffect(() => {
    loginDispatch(loginActions.isLoggedIn())
  }, [])

  const pages = [
    "authors",
    "books",
    "add book",
    "login"
  ]

  return (
    <div>
      <div>
        {pages.map(page => (
            <button key={page} onClick={() => setPage(page)}>{page}</button>
        ))}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add book"} />

      <Login show={page === "login"} />
    </div>
  );
};

export default App;
