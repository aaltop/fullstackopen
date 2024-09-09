/* eslint-disable indent */

import App from "./App"
import { NotificationContextProvider } from "./contexts/contextProviders"

import ReactDOM from "react-dom/client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
        <App />
    </NotificationContextProvider>
    </QueryClientProvider>
)