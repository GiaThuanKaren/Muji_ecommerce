import React from 'react'
import { ICON, IconSolid } from 'src/utils/icon'

function Searchinput() {
    return (
        <>
            <div className='flex items-center justify-between rounded-sm h-10 w-[400px] mx-3 overflow-hidden'>
                <input placeholder='Tìm Kiếm' type="text" className='px-1  flex-1 p-0 h-full' />
                <div className='w-20  h-full bg-yellow-500 flex justify-center items-center'>
                    <ICON className='text-black block  ' icon={IconSolid.faSearch} />
                </div>
            </div>
        </>
    )
}

export default Searchinput