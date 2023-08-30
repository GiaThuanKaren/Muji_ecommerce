import { useRouter } from 'next/router'
import React from 'react'
import { SelectInputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { OptionValueResponeModel, ProductSkuResponeModel, SkuValueModel, SkuValueResponeModel } from 'src/Model/apiModel'
import { CreateNewSkuValue, FetchAllSkuValue } from 'src/services/api/Skuvalue'
import { FetchAllOptionValue } from 'src/services/api/optonValue'
import { FetchAllProductSku } from 'src/services/api/productsku'
import { ShowToast } from 'src/utils'
import { routingLink } from 'src/utils/routingLink'

function Addnewskuvalue() {
    const { push } = useRouter();
    const [listProductSku, setlistProductSku] = React.useState<ProductSkuResponeModel[]>([])
    const [listOptionValue, setListOptionValue] = React.useState<OptionValueResponeModel[]>([])
    const [listSkuValue, setListSkuValue] = React.useState<SkuValueResponeModel[]>([])
    const [value, setValue] = React.useState<SkuValueModel>({
        optionId: "",
        productId: "",
        skuId: "",
        valuesId: ""
    })


    const handleInput = function (key: string, value1: any) {
        setValue({
            ...value,
            [key]: value1
        })
    }

    const handleCreateNewSkuValue = async function () {
        try {
            let check = listSkuValue.find((item: SkuValueResponeModel, index: number) => {
                return item.valuesId.id.productId.toString() == value.productId &&
                    item.valuesId.id.optionId.toString() == value.optionId &&
                    item.valuesId.id.valueId.toString() == value.valuesId &&
                    item.productSku.id.skuId.toString() == value.skuId
            })
            if (check) {
                ShowToast("Duplicate ID", " WARNING");
                return
            }
            await CreateNewSkuValue(value);
            await push(routingLink.skuvaluemanage)
        } catch (error) {

        }
    }

    async function FetchApi() {
        try {
            let result1 = await FetchAllProductSku()
            let result2 = await FetchAllOptionValue()
            let result3 = await FetchAllSkuValue()
            setListSkuValue(result3?.data as SkuValueResponeModel[])
            setListOptionValue(result2?.data as OptionValueResponeModel[])
            setlistProductSku(result1?.data as ProductSkuResponeModel[])
            if(result1?.data.length==0){
                ShowToast("Please add at least 1 product sku to continue"," WARNING")
                await push(routingLink.skuvaluemanage)
            }
            if (result1?.data && result1?.data.length > 0) {
                let firstProductId: number = result1?.data[0].id.productId as number
                let arr = result2?.data.filter((item: OptionValueResponeModel) => {
                    return item.id?.productId == firstProductId
                })
                if (arr && arr?.length > 0) {
                    setValue({
                        productId: firstProductId.toString(),
                        skuId: result1?.data[0].id.skuId.toString(),
                        optionId: arr[0].id?.optionId.toString() as string,
                        valuesId: arr[0].id?.valueId.toString() as string
                    })
                } else {
                    ShowToast("Please Add at least 1 optionValue Of this Product To Continue".toLowerCase(), " WARNING")
                }

            }

        } catch (error) {

        }
    }

    React.useEffect(() => {
        FetchApi()
    }, [])

    console.log(value,listOptionValue,listProductSku)
    return (
        <>
            <MainLayout>
                <SelectInputComp handleOnchange={(e) => {

                    handleInput("productId", e.target.value.split("_")[0])
                    handleInput("skuId", e.target.value.split("_")[1])
                }} leftText='Product Sku' >

                    {
                        listProductSku.map((item: ProductSkuResponeModel, index: number) => {
                            return <>
                                <option value={`${item.id.productId}_${item.id.skuId}`}>
                                    {item.skuName} - {item.id.productId}
                                </option>
                            </>
                        })
                    }
                </SelectInputComp>

                <SelectInputComp handleOnchange={(e) => {
                    console.log(e.target.value, e.target.value.split("_")[0], e.target.value.split("_")[1])
                    setValue({
                        ...value,
                        optionId: e.target.value.split("_")[0],
                        valuesId: e.target.value.split("_")[1]
                    })
                    // handleInput("optionId", e.target.value.split("_")[0])
                    // handleInput("valuesId", e.target.value.split("_")[1])
                }} leftText='Option Id'>
                    {
                        listOptionValue.map((item: OptionValueResponeModel) => {
                            if (value.productId == item.id?.productId.toString()) {
                                return <>
                                    <option value={`${item.id?.optionId}_${item.id?.valueId}`}>
                                        {item.id?.optionId} - {item.valuesName}
                                    </option>
                                </>
                            }

                        })
                    }
                </SelectInputComp>
                <div className='flex items-center justify-end px-5'>
                    <div onClick={handleCreateNewSkuValue} className='mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
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

export default Addnewskuvalue