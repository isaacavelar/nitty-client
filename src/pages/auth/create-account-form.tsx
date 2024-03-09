import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CreateAccountForm() {
    const navigate = useNavigate()

    type CreateAccountForm = z.infer<typeof createAccountFormSchema>

    const createAccountFormSchema = z.object({
        email: z.string().min(2, 'Email deve conter pelo menos 2 caracteres!')
    });

    const createAccountForm = useForm<CreateAccountForm>({
        resolver: zodResolver(createAccountFormSchema),
        defaultValues: {
            email: ""
        }
    })

    async function onSubmit(values: CreateAccountForm) {
        const url = 'http://localhost:4955/auth'

        try {
            const response = await axios.post(url, values)
            localStorage.setItem('auth', JSON.stringify(response))
            navigate('/dashboard')
        } catch (err: any) {
            // toast({
            //     variant: "destructive",
            //     title: "Erro ao fazer login",
            //     description: err.response.data.error,
            // })
        }
    }

    return (
        <div>
            <Form {...createAccountForm}>
                <form onSubmit={createAccountForm.handleSubmit(onSubmit)} className="grid w-96 space-y-4">
                    <FormField
                        control={createAccountForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="nome@exemplo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                  <Button>Criar Conta</Button>
                </form>
            </Form>
        </div>
    )
}