import * as React from "react"
import {CalendarIcon} from "@radix-ui/react-icons"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useContext} from "react";
import {applyFilter, TableFilterContext} from "@/components/datatable/data-table";
import {DataTableFilterProps} from "@/components/datatable/data-table-toolbar";
import {Calendar} from "@/components/ui/calendar";
import {format, parse, isValid} from "date-fns";
import {ko} from 'date-fns/locale'
import {Separator} from "@/components/ui/separator";

const DATA_FORMAT = 'yyyy-MM-dd';
const DISPLAY_FORMAT = 'PPP';

export function DataTableFilterDate(
    {
        columnId,
        title,
        onFilter
    }: DataTableFilterProps) {

    const tableFilterContext = useContext(TableFilterContext);

    const fv = (tableFilterContext[columnId] ?? [])[0];
    let dataDate: Date | undefined = parse(fv, DATA_FORMAT, new Date());

    if (!isValid(dataDate)) {
        dataDate = undefined
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "h-8 w-[150px] lg:w-[190px] justify-start text-left font-normal",
                        !dataDate && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {dataDate ? format(dataDate, DISPLAY_FORMAT, {locale: ko}) : <span>{title}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={dataDate}
                    onSelect={(day, selectedDay) => {
                        const f: string[] = [];
                        if (day) f.push(format(day, DATA_FORMAT));
                        onFilter(applyFilter(tableFilterContext, f, columnId));
                    }}
                    locale={ko}
                    initialFocus
                />
                {dataDate
                    ? <><Separator/>
                        <Button className="justify-center text-center w-full" variant={"ghost"}
                                onClick={() => onFilter(applyFilter(tableFilterContext, [], columnId))}>조건
                            초기화</Button></>
                    : ""}
            </PopoverContent>
        </Popover>
    )
}