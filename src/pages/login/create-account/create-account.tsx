import { CreateAccountForm } from "./create-account-form"
import { CreateAccountPageTheme } from "./create-account-page-theme"
import { motion, AnimatePresence } from "framer-motion"

export function CreateAccount() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-1 justify-center">
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Criar uma conta</h1>
                        <p className="text-sm text-muted-foreground">Preencha o formulário abaixo para criar sua conta</p>
                    </div>
                    <CreateAccountForm />
                </div>
            </div>

            <hr className="border-solid border h-full" />

            <AnimatePresence>
                <motion.div
                    key="createAccountPageTheme"
                    initial={{ opacity: 0, x: "-100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-1 justify-center"
                >
                    <CreateAccountPageTheme />
                </motion.div>
            </AnimatePresence>

        </div>
    ) 
}