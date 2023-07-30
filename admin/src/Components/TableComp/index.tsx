import React from 'react'
import { ICON, IconSolid } from 'src/utils'

interface Props{
    handleEdit: Function,
    handleDelete: Function

    headerRow: string[]
  
    totalData: number;
    displayEachPage?: number
    children:React.ReactNode
}

function TableComp({children,  handleDelete, handleEdit, headerRow }: Props) {
    const [openModal, setOpenModal] = React.useState(false);
    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto ">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        {
                                            headerRow.map((item) => {
                                                return <>
                                                    <th scope="col" className="px-6 py-4">
                                                        {item}
                                                    </th>
                                                </>
                                            })
                                        }
                                        <th>
                                            Action
                                        </th>
                                    </tr>


                                </thead>
                                {children}
                            </table>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <div className='flex items-center justify-center'>
                        <div className='flex items-center'>
                            <ICON icon={IconSolid.faChevronLeft} />
                            <p className='mx-2 font-medium'>
                                Previouis
                            </p>
                        </div>
                        <p className='mx-3 font-medium'>
                            5
                        </p>
                        <div className='flex items-center'>
                            <p className='mx-2 font-medium'>
                                Next
                            </p>
                            <ICON icon={IconSolid.faChevronRight} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TableComp