import React from 'react'
import { Footer, Header } from 'src/Components'

interface Props {
    children: React.ReactNode
}


function MainLayout({ children }: Props) {
    return (
        <>
            <Header />
            <div className='mt-28 xl:mx-[200px]'>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default MainLayout