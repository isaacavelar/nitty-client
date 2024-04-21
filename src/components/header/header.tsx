import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "./mode-toogle"
import { Link } from "react-router-dom"
import { MyAccount } from "./my-account"
import { SearchHeader } from "./search"
import NittyLogoDark from "../../assets/nitty-dark.jpeg"
import NittyLogoLigth from "../../assets/nitty-light.jpeg"
import { useTheme } from "../theme/theme-provider"

export function Header() {
    const { theme } = useTheme()
    const img = theme === "dark" ? NittyLogoDark: NittyLogoLigth

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 pt-2 text-sm">
                    <div className="flex items-center pl-8 p-3 gap-1">
                        <img src={img} alt="" className="max-w-8 mr-2 mb-1"/>
                        <span className="hidden font-bold sm:inline-block">Nitty</span>                              
                    </div> 
                    <div className="flex gap-8">
                        <Link to="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">Dashboard</Link>
                        <Link to="/tasks" className="transition-colors hover:text-foreground/80 text-foreground/60">Suas Atividades</Link>
                        <Link to="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Sobre</Link>
                    </div> 
                </div> 
                <div className="header-menus flex items-center space-x-3 mr-4">
                    <SearchHeader />
                    <ModeToggle />
                    <MyAccount />
                </div>
            </div>
            <Separator />
        </div>
       
    )

}