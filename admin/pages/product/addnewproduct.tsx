import { useRouter } from 'next/router'
import React from 'react'
import { InputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { CategoriesResponeModel, OptionModelRespone, ProductModel } from 'src/Model/apiModel'
import { FetchAllCategories } from 'src/services/api/categories'
import { FetchAllOption } from 'src/services/api/option'
import { CreateNewProduct } from 'src/services/api/product'
import { ICON, IconSolid } from 'src/utils'
import { routingLink } from 'src/utils/routingLink'

function AddNewProduct() {
    const [properties, setProperties] = React.useState<ProductModel>({
        list_option: [

        ],
        categories_id: 0,
        nameProduct: "",
        productDescription: "",
        quantityStock: 0
    })
    const [valueOption, setValueOption] = React.useState<OptionModelRespone[]>([])
    const [valueCateGories, setValueCategories] = React.useState<CategoriesResponeModel[]>([])
    const handleInput = function (key: string, value: any) {
        setProperties({
            ...properties,
            [key]: value
        })
    }
    const { push } = useRouter()
    const handleCreateNewOption = async function () {
        try {
            let result = await CreateNewProduct(properties)
            console.log(result)
            push(routingLink.sanpham)
        } catch (error) {
            console.log(error)
        }
    }
    const handleOptionIdInput = async function (value: number) {
        if (properties.list_option?.includes(value)) {
            setProperties({
                ...properties,
                list_option: properties.list_option.filter((item: number) => item != value)
            })
        } else {
            setProperties({
                ...properties,
                list_option: [...properties.list_option, value]
            })
        }
    }

    async function FetchApi() {
        try {
            let categoriesList = await FetchAllCategories();
            let optionList = await FetchAllOption();
            setValueCategories(categoriesList?.data as CategoriesResponeModel[])
            setValueOption(optionList?.data as OptionModelRespone[])

        } catch (error) {

        }
    }
    console.log(properties)
    React.useEffect(() => {
        FetchApi()
    }, [])

    return (
        <>
            <MainLayout>
                <h3 className='font-medium text-lg text-center my-3'>
                    Tạo mới sản phẩm
                </h3>
                <div className='w-full min-h-fit '>
                    <InputComp
                        handleOnchange={(e) => {
                            console.log(e.target.value)
                            handleInput("nameProduct", e.target.value)
                        }}
                        leftText='Name Product'
                        valueInput={properties.nameProduct}
                    />
                    <InputComp
                        handleOnchange={(e) => {
                            console.log(e.target.value)
                            handleInput("productDescription", e.target.value)
                        }}
                        leftText='Product description'
                        valueInput={properties.productDescription}
                    />

                    <InputComp
                        type='number'
                        handleOnchange={(e) => {
                            console.log(e.target.value)
                            handleInput("quantityStock", e.target.value)
                        }}
                        leftText='Quantity Stock'
                        valueInput={properties.quantityStock}
                    />
                    <h3 className='font-medium mr-5 mb-4 px-2'>Categories ID</h3>

                    <select onChange={(e) => {
                        handleInput("categories_id", parseInt(e.target.value) as number)
                    }} className='w-1/2 mb-5 h-12 border-[3px] px-3' name="" id="">
                        <option value={0}>
                            0 - Không Có
                        </option>
                        {

                            valueCateGories.map((item: CategoriesResponeModel, index: number) => {
                                return <>
                                    <option value={item.catorgoryID}>
                                        {item.catorgoryID} - {item.nameCategory}
                                    </option>
                                </>
                            })
                        }
                    </select>
                    <h3 className='font-medium mr-5 mb-4 px-2'>Option ID</h3>
                    <div className='flex flex-wrap  border-[2px] my-3 py-4 px-3'>
                        {
                            valueOption.map((item: OptionModelRespone, index: number) => {
                                if (properties.list_option?.includes(item.optionID))
                                    return <>
                                        <div className='flex w-fit px-3 py-1 items-center border-[2px] border-gray-400 rounded-md mr-5  '>
                                            <ICON onClick={() => {
                                                setProperties({
                                                    ...properties,
                                                    list_option: properties.list_option.filter((item1: number) => item1 != item.optionID)
                                                })
                                            }} className='mr-2 hover:cursor-pointer' icon={IconSolid.faTimes} />
                                            <h3>
                                                {item.optionName}
                                            </h3>
                                        </div>
                                    </>
                            })
                        }
                    </div>
                    <select onChange={(e) => {
                        if (parseInt(e.target.value) as number != 0) {
                            handleOptionIdInput(parseInt(e.target.value) as number)
                        }


                    }} className='w-1/2 mb-5 h-12 border-[3px] px-3' name="" id="">
                        <option value={0}>
                            0 - Không Có
                        </option>
                        {

                            valueOption.map((item: OptionModelRespone, index: number) => {
                                return <>
                                    <option value={item.optionID}>
                                        {item.optionID} - {item.optionName}
                                    </option>
                                </>
                            })
                        }
                    </select>
                    <div className='flex items-center justify-end px-5'>
                        <div onClick={handleCreateNewOption} className='mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
                            <p className='  text-white text-center  px-4'>
                                Save
                            </p>
                        </div>

                        <div className='mx-2 h-12 bg-red-500 text-white text-center flex items-center justify-center rounded-lg '>
                            <p className='  text-white text-center  px-4'>
                                Cancel
                            </p>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default AddNewProduct