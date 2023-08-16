import { useRouter } from 'next/router'
import React from 'react'
import { InputComp, SelectInputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { ProductResponeModel, ProductSkuModel, ProductSkuResponeModel } from 'src/Model/apiModel'
import { FetchAllProduct } from 'src/services/api/product'
import { CreateNewProductSku, FetchAllProductSku } from 'src/services/api/productsku'
import { ShowToast } from 'src/utils'
import { routingLink } from 'src/utils/routingLink'
type ImageProductType = {
    imgurl: string,
    file: File | null
}

function Addnewproductsku() {
    const { push } = useRouter()
    const [listProductSku, setlistProductSku] = React.useState<ProductSkuResponeModel[]>([])
    const [listProduct, setListProduct] = React.useState<ProductResponeModel[]>([])

    const [imageProduct, SetImageProduct] = React.useState<ImageProductType>({
        file: null,
        imgurl: ""
    });
    const [value, setValue] = React.useState<ProductSkuModel>({
        sku_name: "",
        // sku_id: 
    })
    const handleInput = function (key: string, value1: any) {
        setValue({
            ...value,
            [key]: value1,
        })
    }
    const handleCreateNewProductSku = async function () {
        try {
            let check = listProductSku.find((item: ProductSkuResponeModel) => {
                return item.id.productId == value?.product_id && item.id.skuId == value.sku_id
            })
            if (check) {
                ShowToast("Duplicated ProductId and Sku ID , please change ", "ERROR")
                return
            }
            value.sku_name = generateRandomString(5)
            await CreateNewProductSku(value as ProductSkuModel, imageProduct.file as File)
            await push(`${routingLink.productsku}`)
        } catch (error) {

        }
    }
    function generateRandomString(length: number) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let random = listProductSku.map((item: ProductSkuResponeModel) => {
            return item.skuName
        })
        let randomString
        do {
            const firstLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

            let restOfChars = '';
            for (let i = 0; i < length - 1; i++) {
                restOfChars += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }

            randomString = firstLetter + restOfChars;
        } while (random.includes(randomString))


        return randomString;
    }
    async function FetchApi() {
        try {
            let dataListProduct = await FetchAllProduct();
            let dataListProductSku = await FetchAllProductSku();
            setValue({
                sku_id: dataListProductSku?.data[dataListProductSku?.data.length - 1]?.id.skuId + 1,
                sku_name: "",
                product_id: dataListProduct?.data[dataListProduct.data.length - 1].productId
            })
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
                <SelectInputComp handleOnchange={(e) => {
                    if (e.target.value == "0") {
                        let id = listProductSku[listProductSku.length - 1].id.skuId + 1
                        console.log(id, listProductSku[listProductSku.length - 1].id.skuId)
                        // let id = generateRandomString(5);
                        handleInput("sku_id", id)
                    } else {
                        handleInput("sku_id", e.target.value)
                    }
                    console.log(e.target.value)
                }} leftText='Sku ID'>
                    <option value={0}>Auto</option>
                    {
                        listProductSku.map((item: ProductSkuResponeModel, index: number) => {
                            return <>
                                <option value={item.id.skuId}>
                                    {item.skuName} - {item.id.skuId}
                                </option>
                            </>
                        })
                    }
                </SelectInputComp>



                <SelectInputComp leftText='Product Id' handleOnchange={(e) => {
                    handleInput("product_id", e.target.value)
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



                <InputComp type='number' valueInput={value?.price} leftText='Price' handleOnchange={(e) => {
                    handleInput("price", e.target.value)
                }} />

                <InputComp leftText='Quantity' type='number' handleOnchange={(e) => {
                    handleInput("quantityStock", parseInt(e.target.value) as number)
                }} />

                <div className='max-h-80 w-[100px]'>
                    {
                        imageProduct.file ? <img
                            src={imageProduct.imgurl}
                            alt="" /> :
                            <img src={value?.imageProduct} alt="" />
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

                }} type={"file"} leftText='Image product' />


                <div className='flex items-center justify-end px-5 my-10'>
                    <div onClick={handleCreateNewProductSku} className='hover:cursor-pointer mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
                        <p className='  text-white text-center  px-4'>
                            Save
                        </p>
                    </div>

                    <div className='hover:cursor-pointer mx-2 h-12 bg-red-500 text-white text-center flex items-center justify-center rounded-lg '>
                        <p className='  text-white text-center  px-4'>
                            Cancel
                        </p>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default Addnewproductsku