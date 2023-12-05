import {Metadata} from "next"

import {Separator} from "@/components/ui/separator"
import {SidebarNav} from "./sidebar-nav"
import {UserNav} from "@/app/cntnt/user-nav";

export const metadata: Metadata = {
    title: "Forms",
    description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
    {
        title: "테이블 테스트",
        href: "/cntnt/table2",
    },
    {
        title: "Appearance",
        href: "/examples/forms/appearance",
    },
    {
        title: "Notifications",
        href: "/examples/forms/notifications",
    },
    {
        title: "Display",
        href: "/examples/forms/display",
    },
]

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({children}: SettingsLayoutProps) {
    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 p-4 flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">상단 타이틀</h2>
                        <p className="text-muted-foreground">현재 화면에 대한 설명글..</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <UserNav/>
                    </div>
                </div>
            </div>
            <Separator className="my-1"/>
            <div className="space-y-6 p-4 pb-16">
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5"><SidebarNav items={sidebarNavItems}/></aside>
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}