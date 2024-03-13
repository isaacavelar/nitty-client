import { toast } from "@/components/ui/use-toast";
import { Auth, AuthRefreshTokenPayload } from "@/interfaces/auth";
import { DefaultError } from "@/interfaces/error";
import { User } from "@/interfaces/users";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

export function UseFetch<T = unknown>(url: string) {
    const [data, setData] = useState<T | null>(null)
    const [error] = useState(null)
    const [isFetching, setIsFetching] = useState(true)
    const navigate = useNavigate()
   



    const findUser = () => {
        axios.get
    }

    const refreshToken = (auth: Auth, navigate: NavigateFunction) => {       
        const foundUser = localStorage.getItem('auth')

        if (!auth || !foundUser) {    
            navigate('/login')
            return
        }
        
        const user = (foundUser ? JSON.parse(foundUser).data: {}) as User

        axios.post<Auth, AxiosResponse<Auth>, AuthRefreshTokenPayload>(
            'http://localhost:3000/auth/refresh',
            {
                token: auth.accessToken,
                userId: user._id
            }
        ).then(response => { 
            localStorage.setItem('auth', JSON.stringify(response.data))
        })
    }

    useEffect(() => {
        const foundToken = localStorage.getItem('auth')
        const token = (foundToken ? JSON.parse(foundToken).data: {}) as Auth
        
        const api = axios.create({
            baseURL: `http://localhost:3000/api/v1`,
            headers: {
              "Authorization": token.accessToken
            },
        });
        
        api.get(url)
            .then(response => {
                setData(response.data)
            })
            .catch((err: AxiosError) => {
                const { error } = err?.response?.data as DefaultError

                if (err.response?.status === 401) {
                    navigate('/login')
                }

                toast({
                    variant: "destructive",
                    title: error.title,
                    description: error.description
                })
            })
            .finally(() => {
                setIsFetching(false)
            })
    }, [])


    return { data, error, isFetching }

}