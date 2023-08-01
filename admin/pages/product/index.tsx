import React from 'react'
import { InputComp, ModalWrapper, TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { ProductModel, ProductResponeModel } from 'src/Model/apiModel'
import { FetchAllProduct, UpdateProductId } from 'src/services/api/product'
import { ICON, IconSolid } from 'src/utils'

function GetAllProduct() {
    const [properties, setProperties] = React.useState<ProductResponeModel[]>([])
    const [openModal, setOpenModal] = React.useState(false)
    const [value, setValue] = React.useState<ProductResponeModel>({

    })




    const handleInput = function (key: string, value1: any) {

        setValue({
            ...value,
            [key]: value1
        })
    }

    const handleUpdate = async function () {
        try {
            await UpdateProductId(value );

            setOpenModal(false)
            await FetchApi();
        } catch (error) {

        }
    }

    async function FetchApi() {
        try {
            let result = await FetchAllProduct();
            setProperties(result?.data as ProductResponeModel[])
        } catch (error) {

        }
    }

    React.useEffect(() => {

        FetchApi()
    }, [])
    return (
        <>
            <MainLayout >
                {
                    openModal && <>
                        <ModalWrapper openModalState={openModal} handleOpenModalState={setOpenModal} >
                            <h3 className='text-center font-medium py-2'>
                                Chỉnh sửa thuộc tính
                            </h3>

                            <InputComp disable valueInput={value?.productLineId} leftText='Option ID' widthFull />
                            <InputComp handleOnchange={(e) => {
                                handleInput("nameProductLine", e.target.value)
                            }} valueInput={value?.nameProductLine} leftText='Option Name' widthFull />
                            <InputComp handleOnchange={(e) => {
                                handleInput("imageProductLine", e.target.value)
                            }} valueInput={value?.imageProductLine} leftText='Option Name' widthFull />
                            <div className='flex items-center justify-end px-5'>
                                <div onClick={handleUpdate} className='mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
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
                <TableComp data={[]} handleDelete={() => { }} handleEdit={() => { }} headerRow={[
                    " #",
                    "First",
                    "Last",
                    "Handle",

                ]} totalData={12} displayEachPage={4} >
                    <tbody>

                        {
                            properties.map((item: ProductResponeModel, index: number) => {
                                return <>
                                    <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.productId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.nameProduct}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.productDescription}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.quantityStock}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">

                                            <ICON onClick={() => {
                                                setOpenModal(true)
                                                setValue(item)
                                            }} className='p-3 bg-yellow-300 mx-2 rounded-full' icon={IconSolid.faPenToSquare} />
                                            <ICON onClick={() => {

                                                let result = confirm("Do you want to delete it ?")
                                                if (result) {
                                                    HandleDelete(item.productId as number)
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

export default GetAllProduct