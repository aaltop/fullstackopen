/* eslint-disable indent */

import {
    NotificationContextProvider,
    UserContextProvider,
} from "./contexts/contextProviders"

import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query"

import { ThemeProvider } from "styled-components"
import theme from "./style/theme"

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
                    <ThemeProvider theme={theme}>
                        {props.children}
                    </ThemeProvider>
                </UserContextProvider>
            </NotificationContextProvider>
        </QueryClientProvider>
    )
}
