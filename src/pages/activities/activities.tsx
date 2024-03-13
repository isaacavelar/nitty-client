import { UseFetch } from "@/hooks/useFetch"
import { User } from "@/interfaces/users"

export function Activities() {
   const { data } = UseFetch<User>('/users/authenticated')
    
    return (
        <h1>ALO</h1>
    )
}