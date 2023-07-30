import React from 'react'
import { InputComp, ModalWrapper, TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { ProductLineModel } from 'src/Model/apiModel'
import { FetchAll, UpdateId, deleteProductLine } from 'src/services/api/productline'
import { ICON, IconSolid } from 'src/utils'

function ProductLineIndex() {
    const [properties, setProperties] = React.useState<ProductLineModel[]>([])
    const [openModal, setOpenModal] = React.useState(false)
    const [value, setValue] = React.useState<ProductLineModel>({
        imageProductLine:"",
        nameProductLine:"",
    })
    console.log(value)
    async function FetchApi() {
        try {
            let result = await FetchAll();
            setProperties(result?.data as ProductLineModel[])
        } catch (error) {

        }
    }
    const HandleDelete = async function (id: number) {
        try {
            await deleteProductLine(id)
            await FetchApi();
        } catch (error) {

        }
    }

    const handleUpdate = async function () {
        try {
            await UpdateId(value as ProductLineModel);
            
            setOpenModal(false)
            await FetchApi();
        } catch (error) {

        }
    }


    const handleInput = function (key: string, value1: any) {
        console.log({
            [key]: value
        })
        setValue({
            ...value,
            [key]: value1
        })
    }
    React.useEffect(() => {

        FetchApi()
    }, [])
    return (
        <>
            <MainLayout>
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
                <TableComp handleDelete={() => { }} handleEdit={() => { }} headerRow={[
                    "ProductLine ID",
                    "ProductLine name",
                    "ProductLine Image"
                ]} totalData={properties.length} displayEachPage={4} >

                    <tbody>

                        {
                            properties.map((item: ProductLineModel, index: number) => {
                                return <>
                                    <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.productLineId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.nameProductLine}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.imageProductLine}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">

                                            <ICON onClick={() => {
                                                setOpenModal(true)
                                                setValue(item)
                                            }} className='p-3 bg-yellow-300 mx-2 rounded-full' icon={IconSolid.faPenToSquare} />
                                            <ICON onClick={() => {

                                                let result = confirm("Do you want to delete it ?")
                                                if (result) {
                                                    HandleDelete(item.productLineId as number)
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

export default ProductLineIndex