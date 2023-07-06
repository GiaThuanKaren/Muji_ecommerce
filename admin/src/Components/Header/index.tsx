import React from 'react'
import SearchInput from '../Search'

function Header() {
    return (
        <>
            <div className='flex items-center fixed w-full '>
                <div className='basis-9/12 '>
                    <SearchInput />
                </div>
                <div className='basis-3/12'>
                    <h3>Austin Robertson</h3>
                    <h3>
                        Marketing Administrator
                    </h3>
                </div>
            </div>

        </>
    )
}

export default Header