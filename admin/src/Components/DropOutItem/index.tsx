import { useRouter } from 'next/router';
import React from 'react'
import { DropOutSideBarItem } from 'src/Model';
import { ICON, IconSolid } from 'src/utils';

function DropOutItem({ childrenItem, icon, title, link }: DropOutSideBarItem) {
    const [open, setOpen] = React.useState(true);
    const { push } = useRouter();
    return (
        <>
            <div onClick={() => {
                push(link as string)
            }} className='flex items-center justify-between px-3 py-3  w-full'>
                {icon}
                <p className='font-medium w-full mx-3 text-sm capitalize '>
                    {title}
                </p>
                {
                    childrenItem.length > 0 && (
                        open ? <>
                            <ICON onClick={() => {
                                setOpen(false)
                            }} icon={IconSolid.faChevronRight} />
                        </> :
                            <>
                                <ICON onClick={() => {
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