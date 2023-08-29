import React from 'react'
import { SelectInputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { OptionValueResponeModel, ProductSkuResponeModel, SkuValueModel } from 'src/Model/apiModel'
import { FetchAllOptionValue } from 'src/services/api/optonValue'
import { FetchAllProductSku } from 'src/services/api/productsku'
import { ShowToast } from 'src/utils'

function Addnewskuvalue() {
    const [listProductSku, setlistProductSku] = React.useState<ProductSkuResponeModel[]>([])
    const [listOptionValue, setListOptionValue] = React.useState<OptionValueResponeModel[]>([])
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

    async function FetchApi() {
        try {
            let result1 = await FetchAllProductSku()
            let result2 = await FetchAllOptionValue()
            setListOptionValue(result2?.data as OptionValueResponeModel[])
            setlistProductSku(result1?.data as ProductSkuResponeModel[])
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


    return (
        <>
            <MainLayout>
                <SelectInputComp handleOnchange={(e) => {

                    handleInput("productId", e.target.value.split()[0])
                    handleInput("skuId", e.target.value.split()[0])
                }} leftText='Product Sku' >
                    <option value="123">
                        sdf
                    </option>
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
                    console.log(e.target.value)
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
            </MainLayout>
        </>
    )
}

export default Addnewskuvalue