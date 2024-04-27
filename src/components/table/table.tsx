

interface Props {
    headers: string[];
    children: React.ReactNode;
    footers: string[];
    flag: boolean;
}

export function Table({ headers, children, footers, flag }: Props) {

    return (
        <div className='overflow-auto max-h-[400px]'>
            <table className='table table-xs table-pin-rows'>
                <thead>
                    <tr>
                        <th className='sticky left-0 bg-slate-500'>{headers[0]}</th>
                        <th className={`sticky ${flag ? 'left-[106px]' : 'left-9'} bg-slate-500`}>{headers[1]}</th>
                        {
                            headers?.slice(2).map((header) => <th key={header}>{header}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
                <thead>
                    <tr>
                        <th className='sticky left-0 bg-slate-500'>{headers[0]}</th>
                        <th className={`sticky ${flag ? 'left-[106px]' : 'left-9'} bg-slate-500`}>{headers[1]}</th>
                        {
                            footers?.slice(2).map((footer) => <th key={footer}>{footer}</th>)
                        }
                    </tr>
                </thead>
            </table>
        </div>
    )
}