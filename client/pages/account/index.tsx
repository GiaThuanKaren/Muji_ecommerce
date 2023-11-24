import Link from 'next/link'
import React from 'react'
import { Spinner } from 'src/Components'
import { AccountLayouts, MainLayout } from 'src/Layouts'
import { useGlobal } from 'src/hook'
import { linkRouting } from 'src/utils/routelink'

function AccountIndexPage() {

    const {
        globalState
    } = useGlobal()


    return (
        <>
            <MainLayout>
                <AccountLayouts>
                    {
                        !globalState.auth.user ? <>
                            <div className='flex justify-center'>
                                <Spinner />
                            </div>
                        </> : <>
                            <div className='flex items-center justify-between border-b-2  py-3'>
                                <h3 className='text-yellow-300 font-medium'>Thông Tin Cá Nhân</h3>
                                <Link href={`${linkRouting.editInfo}`}>
                                    <div className='bg-yellow-500 px-2 py-1 rounded-sm flex items-center justify-center'>
                                        <p className='text-white font-medium capitalize'>Sửa thông tin</p>
                                    </div>
                                </Link>
                            </div>
                            <div className='flex justify-between'>
                                <div>
                                    <p className='my-3 px-2 capitalize'>
                                        Họ và tên : {
                                            `${globalState.auth.user.customer_first_name} ${globalState.auth.user.customer_last_name} `
                                        }
                                    </p>
                                    <p className='my-3 px-2 capitalize'>
                                        Công ty :{
                                            `${globalState.auth.user.customer_first_name} ${globalState.auth.user.customer_last_name} `
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className='my-3 px-2 capitalize'>
                                        Địa chỉ email : {
                                            `${globalState.auth.user.customer_email} `
                                        }
                                    </p>

                                    <p>
                                        Số điện thoại :{
                                            `${globalState.auth.user.customer_phone}`
                                        }
                                    </p>

                                </div>
                            </div>
                        </>
                    }
                </AccountLayouts>
            </MainLayout>
        </>
    )
}

export default AccountIndexPage