import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ForwardedRef, useState} from "react";
import {Form, FormField, FormItem} from "@/components/ui/form";


const TaskFormSchema = z.object({
    title: z.string(),
    status: z.string(),
    label: z.string(),
    priority: z.string(),
})

export interface FormPropsType {
    onSuccess: () => void
    onLoadPreStart?: () => void
    onLoadPreEnd?: () => void
    onLoadSubmitStart?: () => void
    onLoadSubmitEnd?: () => void
    onError?: () => void
    children?: React.ReactNode
}

export interface FormForwardedRefType {
    refs: ForwardedRef<HTMLFormElement>
}

export interface TaskFormPropsType {
    testFormId: string | undefined
}



export function TaskForm(
    {
        onSuccess,
        onLoadSubmitStart,
        onLoadSubmitEnd,
        onError,
        refs,
        testFormId
    }: (FormPropsType & FormForwardedRefType & TaskFormPropsType)){

    const [submitLock, setSubmitLock] = useState<boolean>(false);

    const form = useForm<z.infer<typeof TaskFormSchema>>({
        resolver: zodResolver(TaskFormSchema),
        //defaultValues: async () => fetch('/api-endpoint');
        defaultValues: {
            title: "",
            status: "",
            label: "",
            priority: "",
        },
    })

    const [serverErrors, setServerErrors] = useState({
        title: false,
        status: false,
        label: false,
        priority: false,
    });

    const onSubmit = (values: z.infer<typeof TaskFormSchema>) => {
        if (submitLock) return;

        if (onLoadSubmitStart) onLoadSubmitStart();
        setSubmitLock(true);
        console.log(values)
        setTimeout(() => {
            onSuccess();
            if (onLoadSubmitEnd) onLoadSubmitEnd();
            setSubmitLock(false);
        }, 1000);
    }


    return <Form  {...form}>
        <form ref={refs} onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">

            <FormField control={form.control}
                       name="title"
                       render={({field, fieldState, formState}) => {
                           return <FormItem className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="title" className="text-right">Title</Label>
                               <Input id="title" defaultValue="Pedro Duarte" className="col-span-3"/>
                           </FormItem>
                       }}>
            </FormField>

            <FormField control={form.control}
                       name="status"
                       render={({field, fieldState, formState}) => {
                           return <FormItem className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="status" className="text-right">Status</Label>
                               <Input id="status" defaultValue="@peduarte" className="col-span-3"/>
                           </FormItem>
                       }}>
            </FormField>

            <FormField control={form.control}
                       name="label"
                       render={({field, fieldState, formState}) => {
                           return <FormItem className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="label" className="text-right">Label</Label>
                               <Input id="label" defaultValue="@peduarte" className="col-span-3"/>
                           </FormItem>
                       }}>
            </FormField>

            <FormField name="priority"
                       render={({field, fieldState, formState}) => {
                           return <FormItem className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="priority" className="text-right">Priority</Label>
                               <Select>
                                   <SelectTrigger className="w-[180px]">
                                       <SelectValue placeholder="high"/>
                                   </SelectTrigger>
                                   <SelectContent id="priority">
                                       <SelectItem value="high">high</SelectItem>
                                       <SelectItem value="medium">medium</SelectItem>
                                       <SelectItem value="low">low</SelectItem>
                                   </SelectContent>
                               </Select>
                           </FormItem>
                       }}
            />
        </form>
    </Form>
}