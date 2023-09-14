import React from 'react'
import { ICON, IconSolid } from 'src/utils/icon'

function Searchinput() {
    return (
        <>
            <div className='mx-4 flex items-center justify-between rounded-sm h-10 w-fit xl:w-[400px]  overflow-hidden'>
                <input placeholder='Tìm Kiếm' type="text" className='px-1  flex-1 p-0 h-full' />
                <div className=' px-4 h-full bg-yellow-500 flex justify-center items-center '>
                    <ICON className='text-black block  ' icon={IconSolid.faSearch} />
                </div>
            </div>
        </>
    )
}

export default Searchinput