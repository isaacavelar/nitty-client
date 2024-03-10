import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../theme/theme-provider";

export function Base() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="nitty-ui-theme">
            < Outlet />
        </ThemeProvider>
    )
}