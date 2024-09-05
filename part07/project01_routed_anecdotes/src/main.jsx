import App from './App'
import { AnecdotesContextProvider, NotificationContextProvider } from './contexts/contextProviders'

import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AnecdotesContextProvider>
    <NotificationContextProvider>
        <App />
    </NotificationContextProvider>
    </AnecdotesContextProvider>
)