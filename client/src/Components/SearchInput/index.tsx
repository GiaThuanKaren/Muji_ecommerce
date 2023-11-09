import { useRouter } from 'next/router';
import React from 'react'
import { ICON, IconSolid } from 'src/utils/icon'
import { linkRouting } from 'src/utils/routelink';

function Searchinput() {
    const { push } = useRouter()
    const [name, setName] = React.useState('');

    return (
        <>
            <div className='mx-4 flex items-center justify-between rounded-sm min-h-[40px] w-fit xl:w-[400px]  overflow-hidden border-2'>
                <input placeholder='Tìm Kiếm' type="text" value={name} onChange={(e) => setName(e.target.value)} className='px-1  flex-1 p-0 h-full' />
                <div 
                    className=' px-4 min-h-[40px] bg-yellow-500 flex justify-center items-center ' 
                    onClick={() => push({ pathname: `/product${linkRouting.search}`, query: { name } })}
                >
                    <ICON className='text-white font-medium block ' icon={IconSolid.faSearch} />
                </div>
            </div>
        </>
    )
}

export default Searchinput