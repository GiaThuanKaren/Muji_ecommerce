import React from 'react'
import { ICON, IconSolid } from 'src/utils/icon'

function Searchinput() {
    return (
        <>
            <div className='mx-4 flex items-center justify-between rounded-sm min-h-[40px] w-fit xl:w-[400px]  overflow-hidden border-2'>
                <input placeholder='Tìm Kiếm' type="text" className='px-1  flex-1 p-0 h-full' />
                <div className=' px-4 min-h-[40px] bg-yellow-500 flex justify-center items-center '>
                    <ICON className='text-white font-medium block ' icon={IconSolid.faSearch} />
                </div>
            </div>
        </>
    )
}

export default Searchinput