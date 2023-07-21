import React from 'react'
import { TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'

function GetAllProduct() {
    return (
        <>
            <MainLayout >
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

export default GetAllProduct