import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface Props {
    children: React.ReactNode;
}

export function CustomLayout({ children }: Props) {

    return (
        <div className='bg-base-100'>
            <Header />
            <div className='container'>
                <main className='p-6 pt-5 lg:max-w-7xl max-w-full'>
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    )
}