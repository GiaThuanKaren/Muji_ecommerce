import React from 'react'
import { TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { ProductSkuResponeModel, SkuValueResponeModel } from 'src/Model/apiModel'
import { FetchAllSkuValue } from 'src/services/api/Skuvalue'
import { ICON, IconSolid } from 'src/utils'

function SkuValueManageIndexPage() {
    const [properties, setProperties] = React.useState<SkuValueResponeModel[]>([])
    const [openModal, setOpenModal] = React.useState(false)
    const [value, setValue] = React.useState<SkuValueResponeModel>()

    async function FetchApi() {
        try {
            let result = await FetchAllSkuValue();
            setProperties(result?.data as SkuValueResponeModel[])
        } catch (error) {

        }
    }
    React.useEffect(() => {
        FetchApi()
    }, [])
    console.log(properties)
    // return <>

    // </>
    return (
        <>
            <MainLayout>
                <TableComp handleDelete={() => { }} handleEdit={() => { }} headerRow={[
                    "Product ID",
                    "Option ID",
                    "Value ID",
                    "Values Name"
                ]} totalData={properties.length} displayEachPage={4} >
                    <tbody>
                        {
                            properties.map((item: SkuValueResponeModel, index: number) => {
                                return <>
                                    <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.valuesId.id.productId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.valuesId.id.optionId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.valuesId.id.valueId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.valuesId.valuesName}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4">

                                            <ICON onClick={() => {
                                                setOpenModal(true)
                                                setValue(item)
                                            }} className='p-3 bg-yellow-300 mx-2 rounded-full' icon={IconSolid.faPenToSquare} />
                                            <ICON onClick={() => {
                                                let result = confirm("Do you want to delete it ?")
                                                if (result) {
                                                    // HandleDelete(item.optionID as number)
                                                }
                                            }} className='p-3 bg-red-300 rounded-full' icon={IconSolid.faTrash} />
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

export default SkuValueManageIndexPage