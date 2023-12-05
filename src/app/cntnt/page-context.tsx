
export default function PageContext({title,desc, children,}: {
    title: string,
    desc?: string,
    children: React.ReactNode
}) {

    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                        <p className="text-muted-foreground">{desc}</p>
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}