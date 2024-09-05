import App from './App'
import { AnecdotesContextProvider } from './contexts/contextProviders'

import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AnecdotesContextProvider>
        <App />
    </AnecdotesContextProvider>
)