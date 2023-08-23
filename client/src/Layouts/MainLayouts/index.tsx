import React from 'react'
import { Footer, Header } from 'src/Components'

interface Props {
    children: React.ReactNode
}


function MainLayout({ children }: Props) {
    return (
        <>
            <Header />
            <div className='bg-[#f8f8f8] w-full h-full'>
                <div className='mt-24  xl:mx-[200px] '>
                    {children}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default MainLayout