import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Auth } from "./pages/auth/auth";
import { App } from "./App";

export function Routes() {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Auth />
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