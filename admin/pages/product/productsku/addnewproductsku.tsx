import React from 'react'
import { InputComp, SelectInputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { ProductResponeModel, ProductSkuModel, ProductSkuResponeModel } from 'src/Model/apiModel'
import { FetchAllProduct } from 'src/services/api/product'
import { FetchAllProductSku } from 'src/services/api/productsku'

function Addnewproductsku() {
    const [listProductSku, setlistProductSku] = React.useState<ProductSkuResponeModel[]>([])
    const [listProduct, setListProduct] = React.useState<ProductResponeModel[]>([])

    const [value, setValue] = React.useState<ProductSkuModel>()
    const handleInput = function (key: string, value1: any) {
        setValue({
            ...value,
            [key]: value1,
        })
    }
    const handleCreateNewProductSku = async function(){
        try {
            
        } catch (error) {
            
        }
    }
    async function FetchApi() {
        try {
            let dataListProduct = await FetchAllProduct();
            let dataListProductSku = await FetchAllProductSku();
            setlistProductSku(dataListProductSku?.data as ProductSkuResponeModel[])
            setListProduct(dataListProduct?.data as ProductResponeModel[])
        } catch (error) {

        }
    }

    React.useEffect(() => {
        FetchApi()
    }, [])

    return (
        <>
            <MainLayout>

                <InputComp leftText='Sku Name' handleOnchange={(e) => {
                    handleInput("productId", e.target.value)
                }} />

                <SelectInputComp leftText='Product Id' handleOnchange={(e) => {
                    handleInput("productId", e.target.value)
                }}  >
                    {
                        listProduct.map((item: ProductResponeModel, index: number) => {
                            return <>
                                <option value={item.productId}>
                                    {item.nameProduct} - {item.productId}
                                </option>
                            </>
                        })
                    }

                </SelectInputComp>
            </MainLayout>
        </>
    )
}

export default Addnewproductsku