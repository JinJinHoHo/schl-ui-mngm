import "@/styles/globals.css"
import {cn} from "@/lib/utils";
import { fontSans } from "@/lib/fonts"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import TopMenubar from "@/app/top-menu-bar";


interface RootLayoutProps {
    children: React.ReactNode
}


export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head />
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
                <div className="flex-1">
                    <div className="h-full flex-col flex">
                        <TopMenubar/>
                    </div>
                    {children}
                </div>
            </div>
            <TailwindIndicator />
        </ThemeProvider>
        </body>
        </html>
    )
}