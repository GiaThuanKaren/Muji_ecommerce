import Head from 'next/head'
import Image from 'next/image'
import { MainLayout } from 'src/Layouts'
import { TableComp } from 'src/Components'


export default function Home() {
  
  return (
    <>
      <MainLayout>
        <TableComp data={[]} handleDelete={() => { }} handleEdit={() => { }} headerRow={[
          " #",
          "First",
          "Last",
          "Handle",

        ]} totalData={12} displayEachPage={4} />

      </MainLayout>
    </>
  )
}
