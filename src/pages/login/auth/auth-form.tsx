import { z } from "zod" 
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export function AuthForm() {
    const { toast } = useToast()
    const navigate = useNavigate()

    type AuthForm = z.infer<typeof authFormSchema>

    const authFormSchema = z.object({
        email: z.string().email(
            'O endereço de e-mail fornecido parece estar em um formato inválido. Por favor, certifique-se de digitar um endereço de e-mail válido, como exemplo@dominio.com.'
        ),
        password: z.string().min(2, 'Senha deve conter pelo menos 2 caracteres!')
    })

    const authForm = useForm<AuthForm>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: AuthForm) {
        const url = 'http://localhost:3000/auth/token'

        try {
            const response = await axios.post(url, values)
            localStorage.setItem('auth', JSON.stringify(response))
            navigate('/dashboard')
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: err.response.data.error.title,
                description: err.response.data.error.description,
            })
        }
    }

    return (
        <div>
            <Form { ...authForm }>
                <form onSubmit={authForm.handleSubmit(onSubmit)} className="grid w-96 space-y-4">
                    <FormField
                        control={authForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="nome@exemplo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={authForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>senha</FormLabel>
                                <FormControl>
                                    <Input type="password"  placeholder="senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button>Login</Button>
                </form>
            </Form>
        </div>
    )
}