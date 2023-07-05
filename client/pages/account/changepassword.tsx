import React from 'react'
import { AccountLayouts, MainLayout } from 'src/Layouts'

function Changepassword() {
    return (
        <>
            <MainLayout>
                <AccountLayouts>
                    <div>
                        <p>
                            Nhập Email để gửi thông tin để đổi mật khẩu .
                        </p>
                        <input
                            placeholder='Email'
                            type="text"
                            className='px-3 py-2 border-[1px] w-[50%] my-5' />
                        <div className='w-fit px-3 py-2 text-white bg-blue-400'>
                            <p className='text-center font-medium'>
                                Submit
                            </p>
                        </div>
                    </div>

                </AccountLayouts>
            </MainLayout>
        </>
    )
}

export default Changepassword