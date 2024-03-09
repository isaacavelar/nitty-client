import { Auth } from "@/interfaces/auth";
import axios from "axios";
import { useEffect, useState } from "react"

export function UseFetch<T = unknown>(url: string) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    const foundToken = localStorage.getItem('auth')
    const token = (foundToken ? JSON.parse(foundToken).data: {}) as Auth

    const api = axios.create({
        baseURL: "http://localhost:4955/api/external/customer",
        headers: {
          "Authorization": token.accesToken,
          "Content-Type": "application/json"
        },
    });

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