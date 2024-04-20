import * as React from "react"
import {CheckIcon, PlusCircledIcon} from "@radix-ui/react-icons"

import {cn} from "@/lib/utils"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Separator} from "@/components/ui/separator"
import {useContext} from "react";
import {applyFilter, TableFilterContext} from "@/components/datatable/data-table";
import {DataTableFilterProps} from "@/components/datatable/data-table-toolbar";

interface DataTableSelectedFilterProps extends DataTableFilterProps {
    options: {
        label: string
        value: string
        icon?: React.ComponentType<{
            className?: string
        }>
    }[]
}

export function DataTableFilterSelected(
    {
        columnId,
        title,
        options,
        onFilter
    }: DataTableSelectedFilterProps) {


    const tableFilterContext = useContext(TableFilterContext);

    const fv = tableFilterContext[columnId] ?? [];

    return <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
                <PlusCircledIcon className="mr-2 h-4 w-4"/>
                {title}
                {fv.length > 0 && <>
                    <Separator orientation="vertical" className="mx-2 h-4"/>
                    <Badge variant="secondary"
                           className="rounded-sm px-1 font-normal lg:hidden">{fv.length}</Badge>
                    <div className="hidden space-x-1 lg:flex">
                        {fv.length > 2
                            ? <Badge variant="secondary"
                                     className="rounded-sm px-1 font-normal">{fv.length} 선택됨</Badge>
                            : options
                                .filter((option) => fv.includes(option.value))
                                .map((option) => (
                                    <Badge variant="secondary" key={option.value}
                                           className="rounded-sm px-1 font-normal">{option.label}</Badge>
                                ))}
                    </div>
                </>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
                <CommandInput placeholder={title}/>
                <CommandList>
                    <CommandEmpty>조회 결과 없음.</CommandEmpty>
                    <CommandGroup>
                        {options.map((option) => {

                            const isSelected = fv.includes(option.value);

                            return <CommandItem
                                key={option.value}
                                onSelect={() => {
                                    let n: any[];
                                    if (!fv.includes(option.value)) {
                                        n = [...fv, option.value]
                                    } else {
                                        n = fv.filter(value => value !== option.value);
                                    }
                                    // console.log(fv, option.value,!fv.includes(option.value),n);
                                    onFilter(applyFilter(tableFilterContext, n, columnId));
                                }}
                            >
                                <div className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible")}
                                >
                                    <CheckIcon className={cn("h-4 w-4")}/>
                                </div>
                                {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground"/>}
                                <span>{option.label}</span>
                                {/*<span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">{option.value}</span>*/}
                            </CommandItem>
                        })}
                    </CommandGroup>
                    {fv.length > 0 && <>
                        <CommandSeparator/>
                        <CommandGroup>
                            <CommandItem className="justify-center text-center"
                                         onSelect={() => {
                                             onFilter(applyFilter(tableFilterContext, [], columnId));
                                         }}>조건 초기화</CommandItem>
                        </CommandGroup>
                    </>}
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
}