import App from "./App"
import BlogsView from "./components/BlogsView"

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import UsersView from "./components/UsersView"

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <App>
                <BlogsView />
            </App>
        ),
    },
    {
        path: "/users",
        element: (
            <App>
                <UsersView />
            </App>
        ),
    },
])

export default function AppRouter() {
    return <RouterProvider router={router} />
}
