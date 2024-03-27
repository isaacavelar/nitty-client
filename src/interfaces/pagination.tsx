export interface Pagination {
    qtdTotal: number
    title: string
    perPage: number
    currentPage: number
    pageChange: (newPage: number) => void;
}