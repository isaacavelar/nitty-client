import { UseFetch } from "@/hooks/useFetch"
import { User } from "@/interfaces/users"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Separator } from "@radix-ui/react-separator"
import { useState } from "react"

export function Activities() {
   const { data } = UseFetch<User>('/users/authenticated')
   const [currentPage, setCurrentPage] = useState(1)

   const perPage = 10

   const handlePageChange = (newPage: number) => {
       setCurrentPage(newPage);
   }

   const initIndex = (currentPage - 1) * perPage
   const finishIndex = currentPage * perPage
//    const activities = data?.slice(initIndex, finishIndex)
    
    return (
       <div className="p-6 space-y-9">
            <h1 className="text-3xl font-bold">Atividades</h1> 
            <div className="border rounded-lg p-2">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            {/* <Pagination
                        currentPage={currentPage}
                        perPage={perPage}
                        qtdTotal={data.length}
                        title="Pedido"   
                        pageChange={handlePageChange}   
                   ></Pagination> */}
       </div>
    )
}