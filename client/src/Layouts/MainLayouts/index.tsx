import React from 'react'
import { Header } from 'src/Components'

interface Props {
    children: React.ReactNode
}


function MainLayout({ children }: Props) {
    return (
        <>
            <Header />
            {children}

        </>
    )
}

export default MainLayout