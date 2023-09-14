import React from 'react'
import { CardProduct } from 'src/Components'
import { AccountLayouts, MainLayout } from 'src/Layouts'

function Productliked() {
    return (
        <>
            <MainLayout>
                <AccountLayouts>
                    <div className='flex flex-wrap'>
                        {
                            Array.from(Array(10).keys()).map(() => {
                                return <>
                                    {/* <CardProduct /> */}
                                </>
                            })
                        }
                    </div>
                </AccountLayouts>
            </MainLayout>
        </>
    )
}

export default Productliked