/* eslint-disable indent */

import App from "./App"
import Provider from "./Provider"

import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider>
        <App />
    </Provider>
)