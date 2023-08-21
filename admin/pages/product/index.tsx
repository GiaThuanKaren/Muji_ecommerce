import Link from 'next/link'
import React from 'react'
import { InputComp, ModalWrapper, SelectInputComp, TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { CategoriesResponeModel, OptionModelRespone, ProductModel, ProductResponeModel } from 'src/Model/apiModel'
import { FetchAllCategories } from 'src/services/api/categories'
import { FetchAllOption } from 'src/services/api/option'
import { DeleteProductById, FetchAllProduct, UpdateProductId } from 'src/services/api/product'
import { ICON, IconSolid } from 'src/utils'
import { routingLink } from 'src/utils/routingLink'

function GetAllProduct() {
    const [properties, setProperties] = React.useState<ProductResponeModel[]>([])
    const [optionList, SetOptionList] = React.useState<OptionModelRespone[]>([])
    const [categoriesList, SetCategoriesList] = React.useState<CategoriesResponeModel[]>([])
    const [openModal, setOpenModal] = React.useState(false)
    const [value, setValue] = React.useState<ProductResponeModel>({
        list_option: []
    })

    const handleInput = function (key: string, value1: any) {
        setValue({
            ...value,
            [key]: value1,

        })
    }

    const handleUpdate = async function () {
        try {
            await UpdateProductId(value);
            setOpenModal(false)
            await FetchApi();
        } catch (error) {

        }
    }
    const HandleDelete = async function (id: number) {
        try {
            await DeleteProductById(id);
            await FetchApi();
        } catch (error) {

        }
    }
    async function FetchApi() {
        try {
            let result = await FetchAllProduct();
            let optionList = await FetchAllOption();
            let categoriesList = await FetchAllCategories();
            setProperties(result?.data as ProductResponeModel[])
            SetOptionList(optionList?.data as OptionModelRespone[])
            SetCategoriesList(categoriesList?.data as CategoriesResponeModel[])

          
        } catch (error) {

        }
    }

    React.useEffect(() => {
        FetchApi()
    }, [])
    console.log(value)
    return (
        <>
            <MainLayout >
                <div className='flex justify-between px-5'>
                    <div>

                    </div>
                    <Link href={`${routingLink.addsanpham}`}>
                        <div className='bg-blue-300 px-3 py-2 rounded-md hover:cursor-pointer '>
                            <h3 className='text-white font-medium'>Create New</h3>
                        </div>
                    </Link>
                </div>
                {
                    openModal && <>
                        <ModalWrapper openModalState={openModal} handleOpenModalState={setOpenModal} >
                            <h3 className='text-center font-medium py-2'>
                                Chỉnh sửa thuộc tính
                            </h3>

                            <InputComp disable valueInput={value?.productId} leftText='Product ID' widthFull />

                            <InputComp handleOnchange={(e) => {
                                handleInput("nameProduct", e.target.value)
                            }} valueInput={value?.nameProduct} leftText='Product Name' widthFull />

                            <InputComp type='number' handleOnchange={(e) => {
                                handleInput("quantityStock", e.target.value)
                            }} valueInput={value?.quantityStock} leftText='Product Quantity' widthFull />

                            <InputComp handleOnchange={(e) => {
                                handleInput("productDescription", e.target.value)
                            }} valueInput={value?.productDescription} leftText='Product Description' widthFull />

                            <SelectInputComp listResultChoose arrData={value.list_option} primaryfield='optionID' handleUpdateListMulti={(value123: any) => {
                                console.log(value123, "12312")
                                handleInput("list_option", value123 as number[])
                            }} widthFull leftText='Option List' handleOnchange={(e) => {
                                value.list_option && value.list_option.push(parseInt(e.target.value) as number)
                                console.log(parseInt(e.target.value) as number, value.list_option)
                                handleInput("list_option", value?.list_option as number[])
                            }}   >
                                {
                                    optionList.map((item: OptionModelRespone, index: number) => {
                                        return <>
                                            <option value={item.optionID}>
                                                {item.optionName} - {item.optionID}
                                            </option>
                                        </>
                                    })
                                }
                            </SelectInputComp>



                            <SelectInputComp  widthFull leftText='Categories List' handleOnchange={(e) => {
                                handleInput("categories_id", e.target.value)
                            }}   >
                                {
                                    categoriesList.map((item: CategoriesResponeModel, index: number) => {
                                        return <>
                                            <option value={item.catorgoryID}>
                                                {item.nameCategory}
                                            </option>
                                        </>
                                    })
                                }
                            </SelectInputComp>


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
                                                setValue({
                                                    ...item,
                                                    list_option: []
                                                })
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