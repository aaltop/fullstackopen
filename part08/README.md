# Contents

This part of the course deals with using GraphQL to implement client-server communication.

A non-exhaustive list of covered concepts:
- GraphQL
    - typeDefs
        - schemas of types, type definitions for queries and mutations etc.
    - queries
        - a GET equivalent (get data from the server)
    - mutations
        - a POST/PUT/PATCH equivalent (create or change data on the server)
    - resolvers
        - define how queries and mutations are resolved (how the data is accessed and returned)
    - variables
        - allows making queries in a more programmatic and reusable way, as the query can change based on the passed variable(s).
    - fragments
        - define reusable parts to queries and mutations
    - subscriptions
        - allows client to subscribe to events on the server, allowing content to be updated immediately on the client-side as a response to an update on the server
- Apollo Client/Server
    - contexts
        - useful for defining actions that need to be repeated across multiple queries, like setting/reading a token in an authorisation header. Similar to how Express middleware works.
    - expressMiddleWare
        - set up Apollo Server using Express.

## Main technologies introduced

### [GraphQL](https://graphql.org/)

A query language for making resource requests in a scalable and efficient manner.

### [Apollo Server](https://www.apollographql.com/docs/apollo-server)

A GraphQL server-side library. Includes a [GUI for exploring the defined graphs](https://www.apollographql.com/docs/apollo-sandbox), useful for testing the query interface.

### [Apollo Client](https://www.apollographql.com/docs/react)

A GraphQL client-side library. Though communication with the server could happen directly through basic HTTP requests, the Apollo Client naturally adds useful high-level functionality, making development easier.

## Musings

### Fragments

With Apollo Client, I did not find these that necessary, as variables can generally be defined and set in content anyway. One example with Apollo Client is the following:

    import { gql } from '@apollo/client';
    import { COMMENT_FRAGMENT } from './Comment';

    const GET_POST_DETAILS = gql`
    query GetPostDetails($postId: ID!) {
        post(postId: $postId) {
            title
            body
            author
            comments {
                ...CommentFragment
            }
        }
    }

        ${COMMENT_FRAGMENT}
    `;

Here, having to interpolate the definition of the fragment AND THEN use it in the query body is a little redundant. This is because it did work to just do something like the following:

    const allProps = `
    title
    published
    genres
    author {
        name
        born
        bookCount
    }
    `


    const GET_ALL = gql`
        query getBooks($author: String, $genre: String) {
            allBooks(author: $author, genre: $genre) {
                ${allProps}
            }
        }
    `

`allProps` is simply directly interpolated into the query string. It 
could just as well be defined in some more general place and be reused
as a fragment-like across the query definitions in the code base.

All this is considering that defining fragments did not seem to have any
other use to them immediately besides reusable query parameters.
So, there may be some other reason for why using fragments is better
as they may in fact have other uses. For one, instead of using a query
to access some data, fragment-specific data can be accessed with
[useFragment](https://www.apollographql.com/docs/react/api/react/hooks#usefragment),
though this only accesses data in the cache.

A compromise between the styles could be to define the properties as is
done with `allProps`, and interpolate this into a fragment definition:

    const bookProps = `
    title
    published
    genres
    author {
        name
        born
        bookCount
    }
    `

    const BOOK_FRAGMENT = gql`
        fragment BookFragment on Book {
            ${bookProps}
        }
    `


    const GET_ALL = gql`
        query getBooks($author: String, $genre: String) {
            allBooks(author: $author, genre: $genre) {
                ${bookProps}
            }
        }
    `

This way, a fragment is still defined and is usable for other purposes,
but does not need to be added to the query.
In fact, this would allow adding fragments as needed without other changes to the code.

Apollo Client does, however,
have [createFragmentRegistry](https://www.apollographql.com/docs/react/data/fragments#registering-named-fragments-using-createfragmentregistry),
which allows defining fragments in one place and interpolating them
anywhere without the extra adding to each query. If it's possible to use,
it may be the overall preferrable method, avoiding unnecessary repetition
while still allowing proper use of fragments elsewhere.
