import Image from 'next/image'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu, MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger
} from "@/components/ui/menubar";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";

export default function TopMenubar() {
    return (
        <>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>화면 이동</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            <Link href={'/'}>루트</Link>
                        </MenubarItem>
                        <MenubarItem>
                            <Link href={'/sign'}>로그인</Link>
                        </MenubarItem>
                        <MenubarItem>
                            <Link href={'/cntnt/table2'}>컨텐츠</Link>
                        </MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator/>
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator/>
                        <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator/>
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator/>
                        <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </>
    )
}
