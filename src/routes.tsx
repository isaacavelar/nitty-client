import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Auth } from "./pages/login/auth/auth"
import { CreateAccount } from "./pages/login/create-account/create-account"
import { Base } from "./components/base/base"

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
            ],
        },
    ])

    return (
        <RouterProvider router={router} />
    )
}