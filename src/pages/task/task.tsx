import { UseFetch } from "@/hooks/useFetch"
import { Ellipsis } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useState } from "react"
import { Task } from "@/interfaces/tasks"
import { Pagination } from "@/components/pagination/pagination"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
  


export function Tasks() {
   const { data, isFetching } = UseFetch<Task[]>('/tasks')
   const [currentPage, setCurrentPage] = useState(1)

   const perPage = 10

   const handlePageChange = (newPage: number) => {
       setCurrentPage(newPage);
   }

   const initIndex = (currentPage - 1) * perPage
   const finishIndex = currentPage * perPage
   const tasks = data?.slice(initIndex, finishIndex)
    
    return (
        <div>
            { isFetching && <p>carregando...</p>}
            {
                data &&
                <div className="p-6 space-y-9">
                    <h1 className="text-3xl font-bold">Atividades</h1> 
                    <div className="space-y-4">
                        <div className="border rounded-lg p-2">
                            <Table>
                                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Título</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Data de Início</TableHead>
                                        <TableHead>Data de Termino</TableHead>
                                        <TableHead>Progresso</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        tasks?.map(task => (
                                            <TableRow>
                                                <TableCell >{ task.name }</TableCell>
                                                <TableCell>{ task.status ? 'Finalizado': 'Em andamento' }</TableCell>
                                                <TableCell>{ task.startDate }</TableCell>
                                                <TableCell>{ task.completionDate }</TableCell>
                                                <TableCell><Progress value={task.progress} /></TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="outline" size="icon">
                                                                <Ellipsis className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>
                                                               <Link to={`/tasks/${task._id}`}> Fazer atividade </Link> 
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Link to="/dashboard"> Reiniciar atividade </Link>                                                    
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            perPage={perPage}
                            qtdTotal={data.length}
                            title="Pedido"   
                            pageChange={handlePageChange}   
                        ></Pagination>
                    </div>
                </div>
            }
        </div>
    )
}