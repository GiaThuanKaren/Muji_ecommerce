import React from 'react'
import { ICON, IconRegular, IconSolid } from 'src/utils'

function SearchInput() {
    return (
        <>
            <div className='w-full h-24 flex items-center '>
                <ICON icon={IconSolid.faSearch} />


                <input className='flex-1 mx-4' type="text" placeholder='Search' />
                <div className='flex items-center'>
                    <div className='w-11 h-11 bg-red-300 rounded-full'>

                    </div>
                    <ICON icon={IconSolid.faBell} />
                    <ICON icon={IconSolid.faEnvelope} />
                    <div className='w-11 h-11 bg-red-300 rounded-full'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchInput