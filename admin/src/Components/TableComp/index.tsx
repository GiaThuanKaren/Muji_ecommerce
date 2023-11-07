import React from 'react'
import { ICON, IconSolid } from 'src/utils'

interface Props{
    handleEdit: Function,
    handleDelete: Function
    headerRow: string[]
    h1: string,
    pageable: React.ReactNode
    totalData: number;
    displayEachPage?: number
    children:React.ReactNode,
}

function TableComp({children, h1, pageable, handleDelete, handleEdit, headerRow }: Props) {
    const [openModal, setOpenModal] = React.useState(false);
   
    return (
        <>
        <div className="w-full overflow-hidden">
          <h3 className="mb-4 mt-2 ml-6 font-semibold dark:bg-gray-300 text-2xl">{h1}</h3>
          <div className="w-full overflow-hidden rounded-sm shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr className="text-sm font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                          {
                              headerRow.map((item) => {
                                  return <>
                                      <th scope="col" className="px-6 py-4 capitalize">
                                          {item}
                                      </th>
                                  </>
                              })
                          }
                      </tr>
                    </thead>
                      {children}
                  </table>
                </div>
                {pageable}


        </div>
      </div>


    </>
  )
}

export default TableComp