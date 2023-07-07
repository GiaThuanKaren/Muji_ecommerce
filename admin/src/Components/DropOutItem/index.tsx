import React from 'react'
import { DropOutSideBarItem } from 'src/Model';
import { ICON, IconSolid } from 'src/utils';

function DropOutItem({ childrenItem, icon, title }: DropOutSideBarItem) {
    const [open, setOpen] = React.useState(true);
    return (
        <>
            <div className='flex items-center justify-between px-3 py-1'>
                {icon}
                <p className='font-medium '>
                    {title}
                </p>
                {
                    open && childrenItem.length != 0 ? <>
                        <ICON onClick={() => {
                            setOpen(false)
                        }} icon={IconSolid.faChevronRight} />
                    </> :
                        <>
                            <ICON onClick={() => {
                                setOpen(true)
                            }} icon={IconSolid.faChevronDown} />
                        </>
                }
            </div>
            {
                !open && (
                    <>
                        {
                            childrenItem.map((item: DropOutSideBarItem, index: number) => {
                                return <>
                                    <div className='ml-1'>
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