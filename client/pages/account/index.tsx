import React from 'react'
import { AccountLayouts, MainLayout } from 'src/Layouts'

function AccountIndexPage() {
    
    return (
        <>
            <MainLayout>
                <AccountLayouts>
                    <div className='flex items-center justify-between border-b-2  py-3'>
                        <h3 className='text-yellow-300 font-medium'>Thông Tin Cá Nhân</h3>
                        <div className='bg-yellow-500 px-2 py-1 rounded-sm flex items-center justify-center'>
                            <p className='text-white font-medium capitalize'>Sửa thông tin</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <p className='my-3 px-2 capitalize'>Họ và tên : Gia Thuận</p>
                            <p className='my-3 px-2 capitalize'>Công ty : Gia Thuận</p>
                        </div>

                        <div>
                            <p className='my-3 px-2 capitalize'>Địa chỉ email : Giathuannguyen213@gmail.com</p>
                            <p className='my-3 px-2 capitalize'>Địa chỉ :  sjiofksdfkh</p>
                        </div>
                    </div>

                </AccountLayouts>
            </MainLayout>

        </>
    )
}

export default AccountIndexPage