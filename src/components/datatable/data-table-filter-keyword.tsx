import * as React from "react"
import {useContext} from "react"
import {applyFilter, TableFilterContext} from "@/components/datatable/data-table";
import {Input} from "@/components/ui/input";
import {DataTableFilterProps} from "@/components/datatable/data-table-toolbar";


export function DataTableFilterKeyword(
    {
        columnId,
        title,
        onFilter
    }: DataTableFilterProps) {

    const tableFilterContext = useContext(TableFilterContext);

    const fv = (tableFilterContext[columnId] ?? [])[0];

    return <Input placeholder={title}
                  value={fv}
                  onChange={(event) => onFilter(applyFilter(tableFilterContext, [event.target.value], columnId))}
                  className="h-8 w-[150px] lg:w-[250px]"
    />
}