import Link from 'next/link'
import React from 'react'
import { InputComp, ModalWrapper, TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { FetchAllProductSku } from 'src/services/api/productsku'
import { ICON, IconSolid } from 'src/utils'
import { routingLink } from 'src/utils/routingLink'
import { ProductSkuResponeModel } from 'src/Model/apiModel'
type ImageProductType = {
    imgurl: string,
    file: File | null
}

function ProductSkuIndex() {
    const [properties, setProperties] = React.useState<ProductSkuResponeModel[]>([])
    const [openModal, setOpenModal] = React.useState(false)
    const [value, setValue] = React.useState<ProductSkuResponeModel>()
    const [imageProduct, SetImageProduct] = React.useState<ImageProductType>({
        file: null,
        imgurl: ""
    });
    async function FetchApi() {
        try {
            let listProductSku = await FetchAllProductSku();
            setProperties(listProductSku?.data as ProductSkuResponeModel[])
        } catch (error) {

        }
    }

    React.useEffect(() => {
        FetchApi()
    }, [])
    console.log(value)

    return (
        <>
            <MainLayout>
                {
                    openModal && <>
                        <ModalWrapper openModalState={openModal} handleOpenModalState={setOpenModal} >
                            <h3 className='text-center font-medium py-2'>
                                Chỉnh sửa thuộc tính
                            </h3>
                            <InputComp valueInput={value?.skuName} leftText='Sku Name' widthFull />
                            <InputComp valueInput={value?.quantityStock} type='number' leftText='Quantity Stock' widthFull />
                            <InputComp valueInput={value?.price} type='number' leftText='Price' widthFull />
                            <div className='max-h-30 w-[100px]'>
                                {
                                    (imageProduct.file || value?.imageProduct != "") && <img
                                        src={imageProduct.imgurl}
                                        alt="" />
                                }
                            </div>
                            <InputComp handleOnchange={(e) => {
                                console.log(e.target.files)
                                if (e?.target?.files) {
                                    SetImageProduct({
                                        file: e?.target?.files[0],
                                        imgurl: URL.createObjectURL(e?.target?.files[0])
                                    })
                                }

                            }} type={"file"} leftText='Image' widthFull />
                            <div className='flex items-center justify-end px-5'>
                                <div className='mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
                                    <p className='  text-white text-center  px-4'>
                                        Save
                                    </p>
                                </div>

                                <div onClick={() => {
                                    setOpenModal(false)
                                }} className='mx-2 h-12 bg-red-500 text-white text-center flex items-center justify-center rounded-lg '>
                                    <p className='  text-white text-center  px-4'>
                                        Cancel
                                    </p>
                                </div>
                            </div>
                        </ModalWrapper>
                    </>
                }
                <div className='flex justify-between px-5'>
                    <div>

                    </div>
                    <Link href={`${routingLink.addnewproductsku}`}>
                        <div className='bg-blue-300 px-3 py-2 rounded-md hover:cursor-pointer '>
                            <h3 className='text-white font-medium'>Create New</h3>
                        </div>
                    </Link>
                </div>
                <TableComp handleDelete={() => { }} handleEdit={() => { }} headerRow={[
                    "Id Product",
                    "Id Sku",
                    "Sku Name",
                    "Quantity Stock",
                    "Image Product",
                    "Price",
                ]} totalData={properties.length} displayEachPage={4} >

                    <tbody>

                        {
                            properties.map((item: ProductSkuResponeModel, index: number) => {
                                return <>
                                    <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.id.productId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.id.skuId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.skuName}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.quantityStock}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.imageProduct}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.price}
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

export default ProductSkuIndex