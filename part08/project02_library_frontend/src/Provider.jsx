
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    split
} from '@apollo/client'

import { setContext } from "@apollo/client/link/context"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from "graphql-ws"


// Apollo client setup
// --------------------

const PORT = 4000

const httpLink = createHttpLink({
    uri: `http://localhost:${PORT}/`,
})

const wsLink = new GraphQLWsLink(createClient({
    url: `ws://localhost:${PORT}/`
}))

const splitLink = split(({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === "OperationDefinition"
            && definition.operation === "subscription"
        )
    },
    wsLink,
    httpLink
)
  
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
    link: authLink.concat(splitLink),
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
            {props.children}
        </ApolloProvider>
    )
}