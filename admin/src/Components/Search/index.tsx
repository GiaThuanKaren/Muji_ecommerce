import React from 'react'
import { ICON, IconRegular, IconSolid } from 'src/utils'

function SearchInput() {
    return (
        <>
            <div className='w-full h-24 flex items-center px-5 '>
                <ICON icon={IconSolid.faSearch} />


                <input className='outline-none border-none flex-1 mx-4' type="text" placeholder='Search' />
              
            </div>
        </>
    )
}

export default SearchInput