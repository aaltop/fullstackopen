import { LoginContextProvider } from './contexts/providers'

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
} from '@apollo/client'

import { setContext } from "@apollo/client/link/context"


// Apollo client setup
// --------------------
const httpLink = createHttpLink({
    uri: "http://localhost:4000/",
})
  
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('userToken')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
})
  
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Author: {
                keyFields: ["name"]
            }
        }
    })
})
// ======================================




export default function Provider(props)
{
    return (
        <ApolloProvider client={apolloClient}>
        <LoginContextProvider>
            {props.children}
        </LoginContextProvider>
        </ApolloProvider>
    )
}