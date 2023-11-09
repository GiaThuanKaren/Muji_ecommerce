import React from 'react'
import { CardProduct } from 'src/Components'
import { MainLayout } from 'src/Layouts'

function SearchPage() {
    return (
        <>
            <MainLayout>
                <div className='flex flex-wrap'>
                    {
                        Array.from(Array(10).keys()).map(() => {
                            return <>
                                {/* <CardProduct /> */}
                            </>
                        })
                    }
                </div>
            </MainLayout>
        </>
    )
}

export default SearchPage