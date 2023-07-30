import React from 'react'
import { ICON, IconSolid } from 'src/utils'
interface Props {
    children: React.ReactNode
    openModalState?: boolean
    handleOpenModalState?: React.Dispatch<React.SetStateAction<boolean>>
}
function ModalWrapper({ children, handleOpenModalState, openModalState }: Props) {
    return (
        <>
            <div className='w-screen h-screen top-0 left-0 right-0 bottom-0 fixed z-[2] bg-[#00000095]'>
                <ICON onClick={() => {
                    handleOpenModalState && handleOpenModalState(false)
                }} icon={IconSolid.faTimes} className='p-3 text-2xl absolute right-0 m-5 text-white  hover:cursor-pointer' />
                <div className='w-full h-full flex items-center justify-center '>
                    <div className='max-w-[40%] px-2 py-1 rounded-md min-w-[30%] overflow-y-auto max-h-[90%] min-h-[80%] bg-white'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalWrapper