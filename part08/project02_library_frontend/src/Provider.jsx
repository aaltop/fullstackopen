import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'


const apolloClient = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache({
        typePolicies: {
            Author: {
                keyFields: ["name"]
            }
        }
    })
})


export default function Provider(props)
{
    return (
        <ApolloProvider client={apolloClient}>
            {props.children}
        </ApolloProvider>
    )
}