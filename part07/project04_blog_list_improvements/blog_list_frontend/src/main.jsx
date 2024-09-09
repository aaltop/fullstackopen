import App from "./App"
import { NotificationContextProvider } from "./contexts/contextProviders"


import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root")).render(
    <NotificationContextProvider>
        <App />
    </NotificationContextProvider>
)