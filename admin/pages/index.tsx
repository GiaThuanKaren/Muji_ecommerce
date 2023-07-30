import Head from 'next/head'
import Image from 'next/image'
import { MainLayout } from 'src/Layouts'
import { TableComp } from 'src/Components'
import { ICON } from 'src/utils'


export default function Home() {

  return (
    <>
      <MainLayout>
        <TableComp handleDelete={() => { }} handleEdit={() => { }} headerRow={[
          " #",
          "First",
          "Last",
          "Handle",

        ]} totalData={12} displayEachPage={4} >
          <tbody>

            {
              Array.from(Array(10).keys()).map((item, index: number) => {
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
        </TableComp>

      </MainLayout>
    </>
  )
}
