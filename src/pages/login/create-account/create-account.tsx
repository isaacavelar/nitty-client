import { CreateAccountForm } from "./create-account-form";
import { CreateAccountPageTheme } from "./create-account-page-theme";

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

            <hr className="border-solid border border-gray-200 h-full" />

            <div className="flex flex-1 justify-center">
                <CreateAccountPageTheme />
            </div>
        </div>
    ) 
}