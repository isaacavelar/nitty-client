import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Auth } from "./pages/login/auth/auth";
import { App } from "./App";
import { CreateAccount } from "./pages/login/create-account/create-account";

export function Routes() {
    const router = createBrowserRouter([
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
            // children: [
            //     {
            //         path: '/dashboard',
            //         element: <Dashboard />
            //     },
            //     {
            //         path: '/orders',
            //         element: <Orders />
            //     }
            // ],
        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}