import {
    Pagination as PaginationRoot,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Pagination as IPagination } from "@/interfaces/pagination"

import { 
    ChevronsRight,
    ChevronsLeft
} from "lucide-react"

export function Pagination({ qtdTotal, title, perPage, currentPage, pageChange}: IPagination) {
    let pagesQtd = Math.floor(qtdTotal / perPage)
    const rest = qtdTotal % perPage

    if (rest) {
        pagesQtd++
    }
   
    const onPageChange = (newPage: number) => {
        pageChange(newPage);
    };


    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
                Total de {qtdTotal} {title}(s)
            </span>
            <PaginationRoot>
                <PaginationContent>
                    <div className="flex items-center space-x-4 lg:space-x-6">
                        <div className="flex w-[110px] items-center justify-center text-sm font-medium">
                            Página {currentPage} de {pagesQtd}
                        </div>
                        <div className="flex items-center space-x-1">
                            <PaginationLink
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => onPageChange(1)}
                                disabled={currentPage===1}
                            >
                                <span className="sr-only">Primeira Página</span>
                                <ChevronsLeft className="h-4 w-4" />
                            </PaginationLink> 
                            <PaginationItem>
                                <PaginationPrevious 
                                    onClick={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage===1}
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => onPageChange(currentPage + 1)}
                                    disabled={pagesQtd === currentPage}
                                />
                            </PaginationItem>
                            <PaginationLink
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => onPageChange(pagesQtd)}
                                disabled={pagesQtd === currentPage}
                            >
                                <span className="sr-only">Última Página</span>
                                <ChevronsRight className="h-4 w-4" />
                            </PaginationLink> 
                        </div>
                    </div>
                </PaginationContent>
            </PaginationRoot>
        </div>
    )
}