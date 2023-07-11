import React from 'react'
import { ICON, IconSolid } from 'src/utils'

interface Props {
    handleEdit: Function,
    handleDelete: Function
    children: React.ReactNode
    headerRow: string[]
    data: any[]

}

function TableComp({ children, data, handleDelete, handleEdit, headerRow }: Props) {

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
                                <tbody>

                                    {
                                        Array.from(Array(10).keys()).map((item,index:number) => {
                                            return <>
                                                <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                                    <td className="whitespace-nowrap px-6 py-4">Mark</td>
                                                    <td className="whitespace-nowrap px-6 py-4">Otto</td>
                                                    <td className="whitespace-nowrap px-6 py-4">

                                                        <ICON className='p-3 bg-yellow-300 mx-2 rounded-full' icon={IconSolid.faPenToSquare} />
                                                        <ICON className='p-3 bg-red-300 rounded-full' icon={IconSolid.faTrash} />
                                                    </td>
                                                </tr>
                                            </>
                                        })
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TableComp