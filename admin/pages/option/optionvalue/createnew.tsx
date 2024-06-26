import React from 'react'
import { InputComp, SelectInputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { OptionModelRespone, OptionValueModel, OptionValueResponeModel, ProductResponeModel, ProductSkuResponeModel } from 'src/Model/apiModel'
import { FetchAllOption } from 'src/services/api/option'
import { CreateNewOptionValueAPi, FetchAllOptionValue } from 'src/services/api/optonValue'
import { FetchAllProduct } from 'src/services/api/product'
import { FetchAllProductSku } from 'src/services/api/productsku'
import { ShowToast } from 'src/utils'

function CreateNewOptionValue() {
    const [listProduct, setListProduct] = React.useState<ProductResponeModel[]>([])
    const [listOption, setListOption] = React.useState<OptionModelRespone[]>([])
    const [listOptionValue, setListOptionValue] = React.useState<OptionValueResponeModel[]>([])
    const [value, setValue] = React.useState<OptionValueModel>({
        option_id: "",
        product_id: "",
        value_name: "",
        value_id: ""
    })

    const handleInput = function (key: string, value1: any) {
        setValue({
            ...value,
            [key]: value1
        })
    }


    const handleCreateNewOptionValue = async function () {
        try {
            // const maxValueId = Math.max(...)
            let a = listOptionValue.map((item: OptionValueResponeModel) => {
                if (item.id?.optionId.toString() == value.option_id && item.id.productId.toString() == value.product_id) {
                    console.log(item)
                    return item.id.valueId
                } else return 0
            })

            console.log(a, Math.max(...(a as number[])))
            if (isFinite(Math.max(...(a as number[])))) {
                value.value_id = (Math.max(...(a as number[])) + 1).toString()
            } else {
                value.value_id = "1"
            }
            await CreateNewOptionValueAPi(value);
            console.log(value)
            setListOptionValue([...listOptionValue, {
                id: {
                    optionId: parseInt(value.option_id),
                    productId: parseInt(value.product_id),
                    valueId: parseInt(value?.value_id as string)
                },
                valuesName: value.value_name
            }])
        } catch (error) {

        }
    }

    console.log(listOptionValue)

    async function FetchApi() {
        try {
            let result1 = await FetchAllProduct()
            let result2 = await FetchAllOption();
            let result3 = await FetchAllOptionValue();
            // if (result3?.data.length == 0) {
            //     ShowToast("Please add more data", " WARNING")
            //     return
            // }
            setListOptionValue(result3?.data as OptionValueResponeModel[])
            setListProduct(result1?.data as ProductResponeModel[])
            setListOption(result2?.data as OptionModelRespone[])
            setValue({
                ...value,
                product_id: result1?.data && result1?.data.length > 0 ? result1?.data[0].productId.toString() : "",
                option_id: result2?.data && result2.data.length > 0 ? result2.data[0].optionID.toString() : ""
            })
        } catch (error) {

        }
    }
    // console.log(value)

    React.useEffect(() => {
        FetchApi()
    }, [])

    return (
        <>
            <MainLayout>
                <SelectInputComp handleOnchange={(e) => {
                    handleInput("product_id", e.target.value)
                }} value={value.product_id} leftText='Product Id'>
                    {
                        listProduct.map((item: ProductResponeModel, index: number) => {
                            return <>
                                <option value={item.productId}>
                                    ProductId :  {item.productId}
                                </option>
                            </>
                        })
                    }
                </SelectInputComp>

                <SelectInputComp value={value.option_id} handleOnchange={(e) => {
                    handleInput("option_id", e.target.value)
                }} leftText='Option Id'>
                    {
                        listOption.map((item: OptionModelRespone, index: number) => {
                            return <>
                                <option value={item.optionID}>
                                    {item.optionID} -  {item.optionName}
                                </option>
                            </>
                        })
                    }
                </SelectInputComp>




                <InputComp leftText='Value Name' valueInput={value.value_name} handleOnchange={(e) => {
                    handleInput("value_name", e.target.value)
                }} />
                <div className='flex items-center justify-end px-5'>
                    <div onClick={() => {
                        handleCreateNewOptionValue();
                    }} className='mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
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
            </MainLayout>
        </>
    )
}

export default CreateNewOptionValue