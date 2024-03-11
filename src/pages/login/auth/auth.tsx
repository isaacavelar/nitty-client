import { Button } from "@/components/ui/button";
import { AuthForm } from "./auth-form"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { CreateAccountFormEmail } from "../create-account/create-account-form"
import { CreateAccountPageTheme } from "../create-account/create-account-page-theme"
import { AuthPageTheme } from "./auth-page-theme"
import { motion, AnimatePresence } from "framer-motion"

export function Auth() {
    const [createAccount, setCreateAccount] = useState(false);

    const onClick = () => {
        setCreateAccount(!createAccount)
    }

    return (
        <div className="flex items-center justify-center h-screen">           
            <div className="flex flex-1 justify-center">    
                    {            
                        createAccount ? (
                            <AnimatePresence>
                                <motion.div
                                    key="createAccountPageTheme"
                                    initial={{ opacity: 0, x: "100%" }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: "-100%" }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-1 justify-center"
                                >
                                    <CreateAccountPageTheme />
                                </motion.div>
                            </AnimatePresence>
                        )                      
                        : <div className="flex flex-col items-center space-y-6">
                            <div className="flex flex-col space-y-2 text-center">
                                <h1 className="text-2xl font-semibold tracking-tight">Pagina de Login</h1>
                                <p className="text-sm text-muted-foreground">Entre com seu email e senha para fazer login.</p>
                            </div>
                            <AuthForm />
                            <div className="flex items-center justify-center">
                                <span className="w-28 border-t"></span>
                                <span className="mx-4 text-xs uppercase text-muted-foreground">
                                    Ou continue com
                                </span>
                                <span className="w-28 border-t"></span>
                            </div>
                            <div className="grid min-w-96">
                                <Button variant="outline">
                                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                                    GitHub
                                </Button>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                Não possui uma contra ? 
                                <Button onClick={onClick} variant="link" className="pl-1.5 pr-1">
                                    Inscreva-se agora
                                </Button>.
                            </span>
                        </div>
                    }
                
            </div>

            <hr className="border-solid border h-full" />


            <div className="flex flex-1 justify-center">
                {
                    createAccount ?
                        <div className="flex flex-col items-center space-y-6">
                            <div className="flex flex-col space-y-2 text-center">
                                <h1 className="text-2xl font-semibold tracking-tight">Criar uma conta</h1>
                                <p className="text-sm text-muted-foreground">Digite seu e-mail abaixo para criar sua conta</p>
                            </div>
                            <CreateAccountFormEmail /> 
                            <div className="flex items-center justify-center">
                                <span className="w-28 border-t"></span>
                                <span className="mx-4 text-xs uppercase text-muted-foreground">
                                    Ou continue com
                                </span>
                                <span className="w-28 border-t"></span>
                            </div>
                            <div className="grid min-w-96">
                                <Button variant="outline">
                                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                                    GitHub
                                </Button>
                            </div>   
                            <span className="text-sm text-muted-foreground">
                                Já possui uma contra ? 
                                <Button onClick={onClick} variant="link" className="pl-1.5 pr-1">
                                    Fazer Login
                                </Button>.
                            </span>  
                        </div> 
                    : (
                        <AnimatePresence>
                            <motion.div
                                key="authPageTheme"
                                initial={{ opacity: 0, x: "-100%" }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: "100%" }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-1 justify-center"
                            >
                                <AuthPageTheme />
                            </motion.div>                 
                        </AnimatePresence>
                       
                    )
                  
                }
            </div>

        </div>
    )
}