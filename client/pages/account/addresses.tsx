import React from 'react'
import { AccountLayouts, MainLayout } from 'src/Layouts'
import { ICON, IconSolid } from 'src/utils/icon'

function Addresses() {
    return (
        <>
            <MainLayout>
                <AccountLayouts>
                    <div className='flex items-center justify-between'>
                        <p className=''>
                            Địa chỉ của bạn
                        </p>
                        <div className='flex items-center bg-yellow-400 p-3'>
                            <ICON className='text-white' icon={IconSolid.faPlus} />
                            <p className='text-white font-medium mx-2'>
                                Thêm địa chỉ mới
                            </p>
                        </div>
                    </div>
                </AccountLayouts>
            </MainLayout>
        </>
    )
}

export default Addresses