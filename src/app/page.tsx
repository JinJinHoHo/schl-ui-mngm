import Link from "next/link";

export default function Home() {
    return <div className="hidden h-full flex-col md:flex">
        <div className={'flex min-h-[350px] w-full justify-center p-10 items-center'}>
            <div>
                <h2>사용 라이브러리</h2>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li><Link href={'https://ui.shadcn.com/docs'}>shadcn/ui</Link></li>
                    <li><Link
                        href={'https://www.radix-ui.com/themes/docs/overview/getting-started'}>radix-ui</Link>
                    </li>
                    <li><Link href={'https://tailwindcss.com/docs/installation'}>tailwindcss</Link></li>
                    <li><Link href={'https://tanstack.com/table/v8'}>tanstack/table</Link></li>
                    <li><Link href={'https://react-day-picker.js.org'}>react-day-picker</Link></li>
                    <li><Link href={'https://date-fns.org'}>date-fns</Link></li>
                    <li><Link href={'https://date-fns.org/v2.16.1/docs/format'}>date-fns / format</Link></li>
                    <li><Link href={'https://react-cmdk.com'}>cmdk</Link></li>
                    <li><Link href={'https://s-yadav.github.io/react-number-format/'}>react-number-format</Link></li>

                </ul>
            </div>
        </div>
    </div>
}
