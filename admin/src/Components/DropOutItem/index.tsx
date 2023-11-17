import { useRouter } from 'next/router';
import React from 'react'
import { DropOutSideBarItem } from 'src/Model';
import { ICON, IconSolid } from 'src/utils';

function DropOutItem({ childrenItem, icon, title, link }: DropOutSideBarItem) {
    const [open, setOpen] = React.useState(true);
    const [selected, setSelected] = React.useState(null); 
    const { push } = useRouter();
    return (
        <>
            <div 
                onClick={() => {
                    push(link as string)
                }} 
                className={`text flex items-center justify-between px-4 py-3  w-full cursor-pointer`}>
                {icon}
                <p className='font-medium text-slate-500 w-full mx-4 text-sm capitalize '>
                    {title}
                </p>
                {
                    childrenItem.length > 0 && (
                        open ? <>
                            <ICON className='hover:cursor-pointer' onClick={(e) => {
                                e.stopPropagation()
                                setOpen(false)
                            }} icon={IconSolid.faChevronRight} />
                        </> :
                            <>
                                <ICON className='hover:cursor-pointer' onClick={(e) => {
                                    e.stopPropagation()

                                    setOpen(true)
                                }} icon={IconSolid.faChevronDown} />
                            </>
                    )
                }
            </div>
            {
                !open && (
                    <>
                        {
                            childrenItem.map((item: DropOutSideBarItem, index: number) => {
                                return <>
                                    <div className='ml-2 my-2'>
                                        <DropOutItem {...item} />
                                    </div>
                                </>
                            })
                        }
                    </>
                )
            }
        </>
    )
}

export default DropOutItem