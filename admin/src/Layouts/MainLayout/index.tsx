import React from 'react'
interface Props {
    children: React.ReactNode
}
function MainLayout({ children }: Props) {

    return (
        <>
            <div className='flex w-screen h-screen'>
                <div className='h-full overflow-y-auto basis-1/6'>
                    <div className='w-full min-h-[100vh] bg-yellow-50'>

                    </div>
                </div>
                <div className='h-full overflow-y-auto  basis-5/6'>
                    <div className='w-full min-h-[100vh] bg-yellow-100'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainLayout