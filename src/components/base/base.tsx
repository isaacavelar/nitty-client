import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../theme/theme-provider";
import { Toaster } from "../ui/toaster";

export function Base() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="nitty-ui-theme">
            <Toaster />
            < Outlet />
        </ThemeProvider>
    )
}