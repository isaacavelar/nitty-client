import { toast } from "@/components/ui/use-toast";
import { Auth } from "@/interfaces/auth";
import { DefaultError } from "@/interfaces/error";
import axios from "axios";
import { useEffect, useState } from "react"

const foundToken = localStorage.getItem('auth')
const token = (foundToken ? JSON.parse(foundToken).data: {}) as Auth

const api = axios.create({
    baseURL: `http://localhost:3000`,
    headers: {
      "Authorization": token.accesToken,
      "Content-Type": "application/json"
    },
});

export function UseFetch<T = unknown>(url: string) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    // const foundToken = localStorage.getItem('auth')
    // const token = (foundToken ? JSON.parse(foundToken).data: {}) as Auth

    // const api = axios.create({
    //     baseURL: `${process.env.API_HOST}`,
    //     headers: {
    //       "Authorization": token.accesToken,
    //       "Content-Type": "application/json"
    //     },
    // });

    useEffect(() => {
        api.get(url)
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                setError(err)
                console.log(err)
            })
            .finally(() => {
                setIsFetching(false)
            })
    }, [])


    return { data, error, isFetching }

}

export function UsePost<TResponse = unknown, TRequest = unknown>(url: string, payload: TRequest) {
    let data: TResponse | null = null
    let error: DefaultError | null = null
    let isLoding: boolean = true

    api.post(url, payload)
        .then(response => {
            data = response.data
        })
        .catch(err => {
           error = err

           console.log(err.response.data);
            toast({
                variant: "destructive",
                title: "Erro ao fazer login",
                description: 'Macaco',
            })
        })
        .finally(() => {
            isLoding = false
        })

        return { data, error, isLoding }
}