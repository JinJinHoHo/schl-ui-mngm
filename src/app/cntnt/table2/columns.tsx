"use client"

import {ColumnDef} from "@tanstack/react-table"


import React from "react";
import {Person} from "@/app/cntnt/table2/fetchData";
import {Progress} from "@/components/ui/progress";

export const columns: ColumnDef<Person>[] = [
    {
        accessorKey: 'firstName',
        cell: info => info.getValue(),
        footer: props => props.column.id,
    },
    {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
    },
    {
        accessorKey: 'age',
        header: () => 'Age',
        footer: props => props.column.id,
    },
    {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: props => props.column.id,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        footer: props => props.column.id,
    },
    {
        accessorKey: 'progress',
        header: 'Profile Progress',
        cell: ({row}) => <Progress value={row.original.progress} />,
        footer: props => props.column.id,
    },
]