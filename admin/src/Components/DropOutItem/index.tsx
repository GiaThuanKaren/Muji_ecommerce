import { useRouter } from 'next/router';
import React from 'react'
import { DropOutSideBarItem } from 'src/Model';
import { ICON, IconSolid } from 'src/utils';

type DrooOutSideBarItemProps = DropOutSideBarItem & { expanded: boolean }

function DropOutItem({ childrenItem, icon, title, link, expanded }: DrooOutSideBarItemProps) {
    const [open, setOpen] = React.useState(true);
    const [isActive, setIsActive] = React.useState(false);
    const { push } = useRouter();
    return (
        <>
            <li 
                onClick={() => {
                    // setIsActive(!isActive)
                    push(link as string)
                }} 
                className={`
                    relative flex items-center py-2 px-3 my-1
                    font-medium rounded-md cursor-pointer
                    transition-colors group
                    ${
                        isActive
                            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                            : "hover:bg-indigo-50 text-gray-600"
                    }
                `}
            >
                {icon}
                <span 
                    className={`overflow-hidden transition-all font-medium text-slate-600 text-sm capitalize ${
                        expanded ? "w-32 ml-3" : "w-0"
                      }`}
                    >
                    {title}
                </span>
                {!expanded && (
                    <div
                        className={`
                        absolute left-full rounded-md px-2 py-1 ml-6 z-10
                        bg-indigo-100 text-indigo-800 text-sm
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                    `}
                    >
                    {title}
                    </div>
                )}
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
            </li>
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