import {Cross2Icon} from "@radix-ui/react-icons"
import {Table} from "@tanstack/react-table"

import {Button} from "@/components/ui/button"
import {DataTableViewOptions} from "./data-table-view-options"

import {useContext, useMemo} from "react";
import {FilterStateType, TableFilterContext} from "@/components/datatable/data-table";

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    filters: () => React.ReactNode[]
    onClean: () => void
}

export interface DataTableFilterProps{
    columnId: string
    title: string
    onFilter: (filterState:FilterStateType) => void
}

export function DataTableToolbar<TData>(
    {
        table,
        filters,
        onClean
    }: DataTableToolbarProps<TData>) {

    const filter = useContext(TableFilterContext);

    const isFiltered = Object.values(filter).length > 0;

    return <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
            {filters()}
            {isFiltered &&
                <Button variant="ghost" onClick={() => onClean()} className="h-8 px-2 lg:px-3">
                    초기화
                    <Cross2Icon className="ml-2 h-4 w-4"/>
                </Button>}
        </div>
        <DataTableViewOptions table={table}/>
    </div>
}