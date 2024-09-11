import App from "./App"
import BlogsView from "./components/BlogsView"
import UsersView from "./components/UsersView"
import User from "./components/User"
import Blog from "./components/Blog"

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

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
    {
        path: "/users/:id",
        element: (
            <App>
                <User />
            </App>
        ),
        loader: ({ params }) => params.id,
    },
    {
        path: "/blogs/:id",
        element: (
            <App>
                <Blog />
            </App>
        ),
        loader: ({ params }) => params.id,
    },
])

export default function AppRouter() {
    return <RouterProvider router={router} />
}
