/* eslint-disable indent */

import {
    NotificationContextProvider,
    UserContextProvider,
} from "./contexts/contextProviders"

import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

export default function Provider(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <NotificationContextProvider>
                <UserContextProvider>
                    {props.children}
                </UserContextProvider>
            </NotificationContextProvider>
        </QueryClientProvider>
    )
}
