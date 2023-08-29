import Link from 'next/link'
import React from 'react'
import { TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { ProductSkuResponeModel, SkuValueResponeModel } from 'src/Model/apiModel'
import { FetchAllSkuValue } from 'src/services/api/Skuvalue'
import { ICON, IconSolid } from 'src/utils'
import { routingLink } from 'src/utils/routingLink'

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
                <div className='flex justify-between px-5'>
                    <div>

                    </div>
                    <div className='flex items-center'>
                        <Link href={`${routingLink.addnewSkuValue}`}>
                            <div className='bg-blue-300 px-3 py-2 rounded-md hover:cursor-pointer '>
                                <h3 className='text-white font-medium'>Create New Sku Value</h3>
                            </div>
                        </Link>
                        {/* <Link className='mx-3' href={`${routingLink.addnewcateogories}`}>
                            <div className='bg-blue-300 px-3 py-2 rounded-md hover:cursor-pointer '>
                                <h3 className='text-white font-medium'>Add New</h3>
                            </div>
                        </Link> */}
                    </div>

                </div>
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