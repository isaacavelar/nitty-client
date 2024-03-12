import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "./mode-toogle"
import { Link } from "react-router-dom"

export function Header() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 pt-2 text-sm">
                    <div className="flex items-center pl-8 p-3">
                        {/* <img src={lmxLogoImage} alt="" className="max-w-8 mr-2"/> */}
                        <span className="hidden font-bold sm:inline-block">Nitty</span>                              
                    </div> 
                    <div className="flex gap-8">
                        <Link to="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">Dashboard</Link>
                        <Link to="/orders" className="transition-colors hover:text-foreground/80 text-foreground/60">Pedidos</Link>
                        <Link to="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Sobre</Link>
                    </div> 
                </div> 
                <div className="header-menus">
                    {/* <SearchHeader /> */}
                    <ModeToggle />
                    {/* <CustomerAccount /> */}
                </div>
            </div>
            <Separator />
        </div>
       
    )

}