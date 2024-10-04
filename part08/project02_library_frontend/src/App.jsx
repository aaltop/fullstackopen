import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import BooksRecommendations from "./components/BooksRecommendations"

import loginActions from "./loginState"
import userQuery from "./queries/user"
import bookQuery from "./queries/books"
import authorQuery from "./queries/authors"

import { useState } from "react"
import { useQuery, useApolloClient, useSubscription } from "@apollo/client"

const App = () => {
  const [page, setPage] = useState("authors")
  const queriedUser = useQuery(userQuery.GET_USER)
  const apolloClient = useApolloClient()
  const bookAddedSub = useSubscription(bookQuery.BOOK_ADDED, {
    onData: ({ client, data: { data } }) => {
        const { author, title } = data.bookAdded
        const message = `A new book "${title}" by "${author.name}" was added!`
        window.alert(message)
        client.cache.evict({ fieldName: "allBooks" })
        client.refetchQueries([{ query: authorQuery.GET_ALL }])

    }
  })

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
        show: loginActions.getLoginState()
    },
    {
        name: "recommendations",
        show: loginActions.getLoginState()
    },
    {
        name: "login",
        show: !loginActions.getLoginState()
    }
  ]

  const logOutButton = !loginActions.getLoginState()
    ? null
    : <button onClick={() => {
        loginActions.logout()
        apolloClient.resetStore()
        setPage("authors")
    }}>Log out</button>

  const recommendations = !userData
    ? null
    : (<BooksRecommendations
      userData={userData}
      show={page === "recommendations"}
    />)

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

      {recommendations}

      <Login show={page === "login"} setPage={() => setPage("authors")} />
    </div>
  );
};

export default App;
