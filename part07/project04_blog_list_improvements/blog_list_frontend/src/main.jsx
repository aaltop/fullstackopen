/* eslint-disable indent */

import AppRouter from "./router"
import Provider from "./Provider"

import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider>
        <AppRouter />
    </Provider>
)
