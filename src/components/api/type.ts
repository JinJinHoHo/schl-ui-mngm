export type Response<TData> = {
    rows: Array<TData>,
    pageCount: number,
}