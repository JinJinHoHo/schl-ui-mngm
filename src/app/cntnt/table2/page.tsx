'use client';

import React, {forwardRef, useMemo, useRef, useState} from 'react'


import {fetchData} from './fetchData'
import {columns} from './columns'
import PageContext from "@/app/cntnt/page-context";
import {DataTable} from "@/components/datatable/data-table";
import {
    Dialog, DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FormPropsType, TaskForm, TaskFormPropsType} from "@/app/cntnt/table2/test-form";
import {X} from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {DataTableFilterDate} from "@/components/datatable/data-table-filter-date";
import {DataTableFilterKeyword} from "@/components/datatable/data-table-filter-keyword";
import {DataTableFilterSelected} from "@/components/datatable/data-table-filter-selected";
import {
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon
} from "@radix-ui/react-icons";


const statuses = [
    {
        value: "backlog",
        label: "Backlog",
        icon: QuestionMarkCircledIcon,
    },
    {
        value: "todo",
        label: "Todo",
        icon: CircleIcon,
    },
    {
        value: "in progress",
        label: "In Progress",
        icon: StopwatchIcon,
    },
    {
        value: "done",
        label: "Done",
        icon: CheckCircledIcon,
    },
    {
        value: "canceled",
        label: "Canceled",
        icon: CrossCircledIcon,
    },
]

const TaskFormForward = forwardRef<HTMLFormElement, (FormPropsType & TaskFormPropsType)>((props, ref) =>
    <TaskForm {...props} refs={ref}/>);
TaskFormForward.displayName = "TaskForm"

interface DialogType {
    onClose: () => void
}


interface DialogStateType {
    open: boolean,
    dataId: string | undefined
}

function TaskFormDialog({
                            onClose,
                            testFormId
                        }: (DialogType & {
    testFormId: string | undefined

})) {

    const formRef = useRef<HTMLFormElement>(null);

    const handlerClose = useMemo(() => onClose, [onClose]);

    const handlerSubmit = useMemo(() => () => {
        if (formRef && formRef.current) formRef.current.requestSubmit();
    }, []);

    return <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when you&apos;re
                    done.</DialogDescription>
            </DialogHeader>

            <TaskFormForward onSuccess={onClose} ref={formRef} testFormId={testFormId}/>

            <DialogFooter>
                <Button type="submit" size={"sm"} onClick={handlerSubmit}>저장</Button>
                <Button type="button" size={"sm"} onClick={handlerClose} variant={"outline"}>닫기</Button>
            </DialogFooter>

            <DialogPrimitive.Close
                onClick={handlerClose}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4"/>
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogContent>
    </Dialog>
}


export default function TaskPage2() {

    const [taskFormDialogState, setTaskFormDialogState] = useState<DialogStateType>({
        open: false,
        dataId: undefined
    });

    const handlerSelectRow = (testFormId: string) => {
        setTaskFormDialogState({open: true, dataId: testFormId});
    }

    const taskFormDialog = taskFormDialogState.open ? <TaskFormDialog
            testFormId={taskFormDialogState.dataId}
            onClose={() => setTaskFormDialogState({open: false, dataId: undefined})}/>
        : undefined;


    return <PageContext title={"테이블 테스트"} desc={"https://tanstack.com/table/v8"}>
        {taskFormDialog}
        <DataTable columns={columns}
                   loadDataSoure={async (pageIndex, pageSize) =>
                       await fetchData({
                           pageIndex: pageIndex,
                           pageSize: pageSize,
                       })}
                   onSelectRow={handlerSelectRow}
                   tablefilters={(setFilter) => [
                       <DataTableFilterKeyword key="keyword"
                                               columnId="keyword"
                                               title="검색어..."
                                               onFilter={setFilter}
                       />,
                       <DataTableFilterSelected key="statuses"
                                                columnId="statuses"
                                                title="상태"
                                                options={statuses}
                                                onFilter={setFilter}
                       />,
                       <DataTableFilterDate key="createDate"
                                            columnId="createDate"
                                            title="생성일자"
                                            onFilter={setFilter}
                       />
                   ]}
        />
    </PageContext>
}