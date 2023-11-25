import React from 'react'
import { Footer, Header, Spinner } from 'src/Components'

interface Props {
    children: React.ReactNode
    isLoading?: boolean
}


function MainLayout({ children, isLoading = false }: Props) {
    return (
        <>
            <Header />
            {
                isLoading && <>
                    <div className='bg-[#ebebeba8] z-10 fixed w-screen h-screen flex justify-center items-center'>
                        <Spinner />
                    </div>

                </>

            }
            <div className=' w-screen h-full'>\

                <div className='bg-[#ffffff] mt-32 px-3  2xl:mx-[200px] '>
                    {children}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default MainLayout