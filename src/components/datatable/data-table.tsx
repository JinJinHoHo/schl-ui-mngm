import * as React from "react"
import {
    ColumnDef,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable, Column, PaginationState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {DataTablePagination} from "./data-table-pagination"
import {DataTableToolbar} from "./data-table-toolbar"
import {cn} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon, EyeNoneIcon
} from "@radix-ui/react-icons";
import {createContext, useMemo, useState} from "react";
import {Response} from "@/components/api/type";


interface DataTableProps<TData> {
    columns: ColumnDef<TData>[]
    loadDataSoure: (
        pageIndex: number,
        pageSize: number,
        filter: { [key: string]: string[] }
    ) => Promise<Response<TData>>
    //onClickRow?: (a: string) => void
    onSelectRow: (a: string) => void,
    tablefilters: (setFilter: any) => React.ReactNode[]
}

export interface FilterStateType {
    [key: string]: string[]
}

export const TableFilterContext = createContext<FilterStateType>({});
TableFilterContext.displayName = 'TableFilterContext';

export function applyFilter(filterState: FilterStateType, changeFiltes: string[], columnId: string): FilterStateType {
    let newFilter;
    if (changeFiltes.length === 0) {
        let cloneVl = {
            ...filterState
        };
        delete cloneVl[columnId]
        newFilter = cloneVl;
    } else {
        newFilter = {...filterState, [columnId]: changeFiltes};
    }
    return newFilter;
}

export function DataTable<TData>(
    {
        columns,
        loadDataSoure,
        onSelectRow,
        tablefilters
    }: DataTableProps<TData>) {


    const [filter, setFilter] = useState<FilterStateType>({});

    const [{pageIndex, pageSize}, setPagination] =
        useState<PaginationState>({
            pageIndex: 0,
            pageSize: 10,
        })

    const [dataQuery, setDataQuery] = useState<Response<TData>>({
        rows: [],
        pageCount: -1,
    });

    const pagination = useMemo((): {
            pageIndex: number;
            pageSize: number
        } => {
            (async () => {
                let response = await loadDataSoure(pageIndex, pageSize, filter);
                setDataQuery(response);
                return response;
            })()
            return {
                pageIndex, pageSize,
            }
        },
        [filter, loadDataSoure, pageIndex, pageSize]
    )

    const [rowSelection, setRowSelection] = useState({})

    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})

    const table = useReactTable({
        data: dataQuery.rows,
        columns,
        pageCount: dataQuery.pageCount,
        state: {
            columnVisibility,
            rowSelection,
            pagination
        },
        enableRowSelection: true,
        enableMultiRowSelection: false,
        manualPagination: true,
        onRowSelectionChange: (updaterOrValue) => {
            setRowSelection(updaterOrValue);
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return <div className="space-y-4">
        <TableFilterContext.Provider value={filter}>
            {JSON.stringify(filter)}
            <DataTableToolbar table={table}
                              onClean={function () {
                                  setFilter({});
                              }}
                              filters={() => tablefilters(setFilter)}
            />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => <TableHead key={header.id}>
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>)}
                        </TableRow>)}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length
                            ? table.getRowModel()
                                .rows.map((row) => <TableRow key={row.id}
                                                             data-state={row.getIsSelected() && "selected"}
                                                             onClick={event => {
                                                                 row.toggleSelected(true);
                                                                 onSelectRow(row.id);
                                                                 return;
                                                             }
                                                             }
                                >
                                    {row.getVisibleCells()
                                        .map((cell) => <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>)}
                                </TableRow>)
                            : <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    조회 결과 없음.
                                </TableCell>
                            </TableRow>}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table}/>
        </TableFilterContext.Provider>
    </div>
}

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableColumnHeader<TData, TValue>({
                                                         column,
                                                         title,
                                                         className,
                                                     }: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <ArrowDownIcon className="ml-2 h-4 w-4"/>
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4"/>
                        ) : (
                            <CaretSortIcon className="ml-2 h-4 w-4"/>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}