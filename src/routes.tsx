import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Auth } from "./pages/login/auth/auth"
import { CreateAccount } from "./pages/login/create-account/create-account"
import { Base } from "./components/base/base"
import { App } from "./App"
import { Dashboard } from "./pages/dashboard/dashboard"
import { Tasks } from "./pages/task/task"

export function Routes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Base />,
            children: [
                {
                    path: '/login',
                    element: <Auth />
                },
                {
                    path: '/account/create/:email',
                    element: <CreateAccount />
                },
                {
                    path: '/',
                    element: <App />,
                    children: [
                        {
                            path: '/dashboard',
                            element: <Dashboard />
                        },
                        {
                            path: '/tasks',
                            element: <Tasks />
                        }
                    ]
                },
            ],
        },
    ])

    return (
        <RouterProvider router={router} />
    )
}