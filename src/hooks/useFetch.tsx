import { toast } from "@/components/ui/use-toast"
import { Auth, AuthRefreshTokenPayload } from "@/interfaces/auth"
import { DefaultError } from "@/interfaces/error"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

export function UseFetch<T = unknown>(url: string) {
    const [data, setData] = useState<T | null>(null)
    const [error] = useState(null)
    const [isFetching, setIsFetching] = useState(true)
    const navigate = useNavigate()

    const foundToken = localStorage.getItem('auth')
    const token = (foundToken ? JSON.parse(foundToken): {}) as Auth

    const api = axios.create({
        baseURL: `http://localhost:3000/api/v1`,
        headers: {
            "Authorization": token.accessToken
        },
    });

    const refreshToken = (navigate: NavigateFunction, originalRequest?: Promise<any>) => {       
        axios.post<Auth, AxiosResponse<Auth>, AuthRefreshTokenPayload>(
            'http://localhost:3000/auth/refresh',
            {
                token: token.refreshToken
            }
        )
        .then(response => { 
            localStorage.setItem('auth', JSON.stringify(response.data))
            api.defaults.headers.common['Authorization'] = response.data.accessToken

            // originalRequest
        })
        .catch((err: AxiosError) => {
            const { error } = err?.response?.data as DefaultError
            
            navigate('/login')

            toast({
                variant: "destructive",
                title: error.title,
                description: error.description
            })
        })

    }

    useEffect(() => {
        api.get(url)
            .then(response => {
                setData(response.data)
            })
            .catch((err: AxiosError) => {
                const { error } = err?.response?.data as DefaultError

                if (err.response?.status === 401) {        
                    refreshToken(navigate)
                    return
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