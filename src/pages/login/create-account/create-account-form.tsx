import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { CreateUserResponse } from "@/interfaces/users"

export function CreateAccountFormEmail() {
    const navigate = useNavigate()

    type CreateAccountForm = z.infer<typeof createAccountFormSchema>

    const createAccountFormSchema = z.object({
        email: z.string().email(
            "O endereço de e-mail fornecido parece estar em um formato inválido. Por favor, certifique-se de digitar um endereço de e-mail válido, como exemplo@dominio.com."
        )
    });

    const createAccountForm = useForm<CreateAccountForm>({
        resolver: zodResolver(createAccountFormSchema),
        defaultValues: {
            email: ""
        }
    })

    async function onSubmit(values: CreateAccountForm) {
        navigate(`/account/create/${values.email}`)
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

export function CreateAccountForm() {
    const { email } = useParams()
    const navigate = useNavigate()

    const createAccountFormSchema = z.object({
        email: z.string().email( "O endereço de e-mail fornecido parece estar em um formato inválido. Por favor, certifique-se de digitar um endereço de e-mail válido, como exemplo@dominio.com."),
        password: z.string().min(2, "Senha deve conter pelo menos 2 caracteres!"),
        name: z.string().min(2, "Nome deve conter pelo menos 2 caracteres!"),
        inglesLevel: z.string().min(2, "Por favor, selecione um nivel de inglês."),
        dailyStudyTimeHours: z.string().min(1, "Deve selecionar ao menos 1 hora ou minuto.")
        .refine(data => data !== '0', {
            message: "Deve selecionar ao menos 1 hora ou minuto."
        }).refine(data => Number(data) < 24, {
            message: "O horario selecionado deve ser entre 1 e 24 horas."
        }),
        dailyStudyTimeMinutes: z.string().min(1, "Deve selecionar ao menos 1 hora ou minuto.")
        .refine(data => data !== '0', {
            message: "Deve selecionar ao menos 1 hora ou minuto."
        })
    })

    type CreateAccountForm = z.infer<typeof createAccountFormSchema>

    const createAccountForm = useForm<CreateAccountForm>({
        resolver: zodResolver(createAccountFormSchema),
        defaultValues: {
            email: email,
            password: "",
            name: "",
            inglesLevel: "",
            dailyStudyTimeHours: "0",
            dailyStudyTimeMinutes: "0"
        }
    })

    async function onSubmit(values: CreateAccountForm) {
        try {
            const response: CreateUserResponse = (
                await axios.post('http://localhost:3000/users', values)
            ).data

            toast({
                title: response.message,
                description: `Email: ${response.user.email}`,
            }) 

            navigate('/dashboard')
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: err.response.data.error.title,
                description: err.response.data.error.description,
            })
        }
    }

    function returnLoginPage() {
        navigate("/login")
    }

    return (
        <div>
            <Form {...createAccountForm}>
                <form onSubmit={createAccountForm.handleSubmit(onSubmit)} className="w-96 space-y-4">
                    <FormField 
                        control={createAccountForm.control}
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
                        control={createAccountForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={createAccountForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="nome" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createAccountForm.control}
                        name="inglesLevel"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nivel de inglês</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um nivel para o seu inglês" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="beginner">Iniciante</SelectItem>
                                <SelectItem value="basic">Básico</SelectItem>
                                <SelectItem value="intermediary">Intermediário</SelectItem>
                                <SelectItem value="advanced">Avançado</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Selecione um nível mais compatível com o seu inglês atual.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-2">
                        <FormLabel>Tempo de estudo diário</FormLabel>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={createAccountForm.control}
                                        name="dailyStudyTimeHours"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-light">Horas</FormLabel>
                                                <FormControl>
                                                        <Input type="number" placeholder="" {...field} />
                                                </FormControl>
                                                
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={createAccountForm.control}
                                        name="dailyStudyTimeMinutes"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-light">Minutos</FormLabel>
                                                <FormControl>
                                                        <Input type="number" placeholder="" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormDescription>
                                    Você pode ajustar o tempo diário de estudos conforme sua necessidade posteriormente.
                                </FormDescription>
                            </div>
                            <div className="grid space-y-4 text-center">
                                <Button>Criar Conta</Button>  
                                <span className="text-sm text-muted-foreground">
                                    Já possui uma contra ? 
                                    <Button onClick={returnLoginPage} variant="link" className="pl-1.5 pr-1">
                                        Fazer Login
                                    </Button>.
                                </span>  
                            </div>
                                 
                        </div>   
                    </div>
                </form>
            </Form>
        </div>
    )
}