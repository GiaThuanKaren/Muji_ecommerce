import { useRouter } from 'next/router';
import React from 'react'
import { CommentCompononent } from 'src/Components';
import { MainLayout } from 'src/Layouts'
import { OptionValueListWithProductIdINF, OptionValues, Product, ProductModel, ProductSkuModel } from 'src/Model';
import { useGlobal } from 'src/hook';
import { AddProductToLocalStorage, GetDetailProductById, getAllOptionByProductIdAndSkuId } from 'src/service/api';
import { _addProductToCart } from 'src/store/app/slices/cartSlices';
import { ProductCartItem, ShowToast } from 'src/utils/constant';
import { ICON, IconRegular, IconSolid } from 'src/utils/icon'


interface ProductSkuChooseInf {
    img: string,
    productSkuId: string,
    size: string,
    skuName: string
    productId?: string,
    price: number
    valuesId: string,
    optionId: string

}


function DetailProductById() {
    const { query, isReady } = useRouter()
    const {
        globalState, dispatch
    } = useGlobal()
    const [productSkuChoose, setProductSkuChoose] = React.useState<ProductSkuChooseInf>({
        img: "",
        productSkuId: "",
        size: "",
        skuName: "",
        productId: "",
        price: 0,
        valuesId: "",
        optionId: ""
    })
    const [optionValue, setOptionValue] = React.useState<OptionValueListWithProductIdINF[]>(
        []
    )
    const [product, setProduct] = React.useState<ProductModel>()
    // const [currentProductSku, setCurrentProductSku] = React.useState<ProductSkuModel>()
    const ratingStart: string[] = ["Tất Cả", "5 Sao", "4 Sao", "3 Sao", "2 Sao"];
    const [numberProductAddToCard, setNumberProductAddToCard] = React.useState(1);
    const [chooseSize, setChooseSize] = React.useState(
        ""
    )

    async function FetchApi() {
        try {
            let result = await GetDetailProductById(query?.idproduct as string);
            let listoptionValue = await getAllOptionByProductIdAndSkuId(
                query?.idproduct as string
            )
            console.log(result?.data)
            console.log("List Option Value")
            console.log(
                listoptionValue
            )
            setOptionValue(
                listoptionValue
            )
            setProductSkuChoose({
                img: result?.data.productSkus[0].imageProduct.toString().trim().startsWith("https://") ? result?.data.productSkus[0].imageProduct : `https://drive.google.com/uc?export=view&id=${result?.data.productSkus[0].imageProduct}` as string,
                productSkuId: result?.data.productSkus[0].id.skuId.toString() as string,
                size: "",
                skuName: result?.data.productSkus[0].skuName as string,
                productId: query.idproduct as string,
                price: result?.data.productSkus[0].price as number,
                valuesId: "",
                optionId: "",
            })
            setProduct(result?.data as ProductModel)
        } catch (error) {

        }
    }
    console.log(productSkuChoose)
    const handleAddCart = async function () {
        try {

            let productAddCart: ProductCartItem = {
                item: {
                    image: productSkuChoose.img,
                    productId: productSkuChoose.productId as string,
                    productsku: productSkuChoose.productSkuId,
                    size: productSkuChoose.size,
                    name: product?.nameProduct as string,
                    price: productSkuChoose.price,
                    optionId: productSkuChoose.optionId.toString(),
                    valuesId: productSkuChoose.valuesId.toString()
                },
                quantity: numberProductAddToCard
            }
            console.log(productAddCart)
            // ShowToast("Added To Cart", "INFO")
            dispatch(_addProductToCart(productAddCart))

        } catch (error) {

        }
    }
    React.useEffect(() => {
        if (isReady) {
            console.log("Ready")
            FetchApi()
        }
    }, [isReady])
    // console.log(product)
    return (
        <>
            <MainLayout>
                <div className='flex w-full h-fit'>
                    <div className='flex-1 xl:basis-2/3 px-3 h-fit'>
                        <div className='  w-full h-full'>
                            <div className='h-[500px]  w-full mb-5'>
                                <img
                                    className='w-full h-full object-contain '
                                    src={productSkuChoose.img}
                                    alt=""
                                />
                            </div>

                            <div className='w-full xl:hidden'>

                                <h3 className='font-medium text-black text-xl'>
                                    {
                                        product?.nameProduct
                                    }
                                </h3>
                                <div className='py-3 flex items-center w-full h-full'>
                                    <div className=''>
                                        <h3>
                                            {/* APM3519-HOG */}
                                            {
                                                productSkuChoose.skuName
                                            }
                                        </h3>
                                    </div>
                                    <div className='px-3  border-l-[1px]   border-r-[1px] border-black mx-3'>
                                        <h3 className=''>
                                            Đã bán 171K
                                        </h3>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className="flex items-center space-x-1">
                                            <svg
                                                className="w-4 h-4 text-yellow-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <svg
                                                className="w-4 h-4 text-yellow-300"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <svg
                                                className="w-4 h-4 text-yellow-300"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <svg
                                                className="w-4 h-4 text-yellow-300"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <svg
                                                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        </div>
                                        <h3 className='mx-1'>
                                            (10)
                                        </h3>
                                    </div>

                                </div>
                                <h3>
                                    Màu Sắc : Xanh Biển

                                </h3>
                                <h3 className='font-medium'>
                                    {
                                        productSkuChoose.price
                                    }
                                </h3>
                                <div className='flex flex-wrap w-full my-3'>
                                    {
                                        product?.productSkus.map((item: ProductSkuModel) => {
                                            return <>
                                                <div onClick={() => {
                                                    setProductSkuChoose({
                                                        ...productSkuChoose,
                                                        img: item.imageProduct,
                                                        productSkuId: item.id.skuId.toString() as string,
                                                        size: "",
                                                        skuName: item.skuName,
                                                        price: item.price
                                                    })
                                                }} className={'h-16 w-12 my-2 mx-2 border-[3px] hover:border-yellow-500  ' + `${item.id.skuId.toString() == productSkuChoose.productSkuId ? " border-[2px] border-yellow-500  " : " "}`}>
                                                    <img className='w-full h-full object-contain'
                                                        src={item.imageProduct.trim().startsWith("https://") ? item.imageProduct : `https://drive.google.com/uc?export=view&id=${item.imageProduct}`}
                                                    />
                                                </div>
                                            </>
                                        })
                                    }
                                </div>




                                <div className='flex items-center border-2 border-[#a5a4a4] w-fit px-3 py-1'>
                                    <ICON onClick={() => {
                                        if (numberProductAddToCard !== 1) {
                                            setNumberProductAddToCard(numberProductAddToCard - 1)
                                        }
                                    }} className={" " + `${numberProductAddToCard == 1 ? " text-slate-400 " : "  "}`} icon={IconSolid.faMinus} />
                                    <h3 className='mx-3 text-lg px-2'>
                                        {numberProductAddToCard}
                                    </h3>
                                    <ICON onClick={() => {
                                        setNumberProductAddToCard(numberProductAddToCard + 1)
                                    }} className='' icon={IconSolid.faPlus} />
                                </div>

                                <div className='flex items-center justify-between my-4'>

                                    <div className='max-w-[200px] min-w-[190px] border-2 border-black flex items-center justify-center px-3 py-2'>
                                        <ICON className='mr-3' icon={IconSolid.faShoppingCart} />
                                        <h3 className='font-medium text-base'>
                                            Thêm vào giỏ hàng
                                        </h3>
                                    </div>

                                    <div className='bg-yellow-300 max-w-[200px] min-w-[190px]  '>
                                        <h3 className='text-white font-medium text-center px-5 py-2'>
                                            Mua Ngay
                                        </h3>
                                    </div>

                                </div>



                            </div>

                            {/* productSkuChoose */}
                            <div className='flex flex-wrap'>

                                {/* {
                                    product?.productSkus.map((item: ProductSkuModel) => {
                                        return <>
                                            <div className=' basis-1/2 mb-5'>
                                                <img
                                                    className='w-full h-full object-contain '
                                                    src={item.imageProduct.trim().startsWith("https://") ? item.imageProduct : `https://drive.google.com/uc?export=view&id=${item.imageProduct}`}
                                                    alt=""
                                                />
                                            </div>

                                        </>
                                    })
                                } */}
                            </div>
                            <h3 className='text-black font-medium text-lg'>
                                Mô tả sản phẩm
                            </h3>

                            <p>
                                {
                                    product?.productDescription
                                }
                            </p>

                        </div>

                        <div className='flex justify-between w-full h-fit flex-col md:flex-row bg-[#F2F2F2]   md:px-10 py-7 my-3'>
                            <div className='flex flex-col items-center'>
                                <h3 className='text-xl my-1 font-medium'>
                                    4.9/5
                                </h3>
                                <div className="my-1 flex items-center space-x-1">
                                    <svg
                                        className="w-9 h-9 text-yellow-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg
                                        className="w-9 h-9 text-yellow-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg
                                        className="w-9 h-9 text-yellow-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg
                                        className="w-9 h-9 text-yellow-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg
                                        className="w-9 h-9 text-yellow-400 dark:text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                </div>
                                <h3 className='my-1'>
                                    (31 Đánh giá)

                                </h3>
                                <div className='bg-blue-800 px-4 py-2 my-1'>
                                    <h3 className='text-white font-medium'>
                                        Gửi đánh giá của bạn
                                    </h3>
                                </div>
                            </div>

                            <div className='flex flex-wrap flex-1 ml-5  '>
                                {
                                    ratingStart.map((item: string, index: number) => {
                                        return <>
                                            <div className='basis-1/4 h-12 px-2 my-3 md:my-0  '>
                                                <div className=' w-full h-full border-2 border-black bg-white flex items-center justify-center'>
                                                    <h3 className=''>
                                                        {item}
                                                    </h3>
                                                </div>
                                            </div>
                                        </>
                                    })
                                }
                            </div>
                        </div>
                        <CommentCompononent />
                    </div>



                    <div className='hidden xl:block xl:basis-1/3 h-full'>


                        <h3 className='font-medium text-black text-xl'>
                            {
                                product?.nameProduct
                            }
                        </h3>
                        <div className='py-3 flex items-center w-full h-full'>
                            <div className=''>
                                <h3>
                                    {/* APM3519-HOG */}
                                    {
                                        productSkuChoose.skuName
                                    }
                                </h3>
                            </div>
                            <div className='px-3  border-l-[1px]   border-r-[1px] border-black mx-3'>
                                <h3 className=''>
                                    Đã bán 171K
                                </h3>
                            </div>
                            <div className='flex items-center'>
                                <div className="flex items-center space-x-1">
                                    <svg
                                        className="w-4 h-4 text-yellow-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg
                                        className="w-4 h-4 text-yellow-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg
                                        className="w-4 h-4 text-yellow-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg
                                        className="w-4 h-4 text-yellow-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg
                                        className="w-4 h-4 text-gray-300 dark:text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                </div>
                                <h3 className='mx-1'>
                                    (10)
                                </h3>
                            </div>

                        </div>
                        <h3>
                            Màu Sắc : Xanh Biển
                        </h3>
                        <h3 className='font-medium'>
                            {
                                productSkuChoose.price
                            }
                            đ
                        </h3>
                        <div className='flex flex-wrap w-full my-3'>
                            {
                                product?.productSkus.map((item: ProductSkuModel) => {
                                    return <>
                                        <div onClick={() => {
                                            console.log(
                                                item.id.skuId
                                            )
                                            setProductSkuChoose({
                                                ...productSkuChoose,
                                                img: item.imageProduct,
                                                productSkuId: item.id.skuId.toString() as string,
                                                size: "",
                                                skuName: item.skuName,
                                                price: item.price,
                                                optionId: "",
                                                productId: query.idproduct as string,

                                            })
                                        }} className={'h-16 w-12 my-2 mx-2 border-[3px] hover:border-yellow-500  ' + `${item.id.skuId.toString() == productSkuChoose.productSkuId ? " border-[2px] border-yellow-500  " : " "}`}>
                                            <img className='w-full h-full object-contain'
                                                src={item.imageProduct.trim().startsWith("https://") ? item.imageProduct : `https://drive.google.com/uc?export=view&id=${item.imageProduct}`}
                                            />
                                        </div>
                                    </>
                                })
                            }
                        </div>




                        {/* Option value start */}



                        {
                            optionValue.map((item: OptionValueListWithProductIdINF, index: number) => {
                                if (
                                    item.sku_id.toString() == productSkuChoose.productSkuId
                                ) {
                                    return <>
                                        <div onClick={() => {
                                            console.log(
                                                item.values_name
                                            )
                                            setProductSkuChoose({
                                                ...productSkuChoose,
                                                valuesId: item.values_id.toString(),
                                                optionId: item.option_id.toString()

                                            })
                                            setChooseSize(item.values_name)
                                        }} className={'hover:cursor-pointer flex items-center justify-center w-16 mx-2 my-2 py-3 ' + `${chooseSize !== item.values_name ? " bg-slate-200" : " bg-yellow-300"}`}>
                                            <p className={'font-medium  text-center ' + `${chooseSize !== item.values_name ? " text-black " : " text-white"}`}>
                                                {item.values_name}
                                                {/* {item.option.optionID} {item1.id.optionId} {item1.id.productId} {item1.id.valueId} {item.} */}
                                            </p>
                                        </div>
                                        {/* {item.values_name} */}
                                    </>
                                }

                            })
                        }




                        {/* Option value end */}






                        <div className='flex items-center border-2 border-[#a5a4a4] w-fit px-3 py-1'>
                            <ICON onClick={() => {
                                if (numberProductAddToCard !== 1) {
                                    setNumberProductAddToCard(numberProductAddToCard - 1)
                                }
                            }} className={" " + `${numberProductAddToCard == 1 ? " text-slate-400 " : "  "}`} icon={IconSolid.faMinus} />
                            <h3 className='mx-3 text-lg px-2'>
                                {numberProductAddToCard}
                            </h3>
                            <ICON onClick={() => {
                                setNumberProductAddToCard(numberProductAddToCard + 1)
                            }} className='' icon={IconSolid.faPlus} />
                        </div>

                        <div className='flex items-center justify-between my-4'>

                            <div onClick={() => {
                                handleAddCart()
                            }} className='hover:cursor-pointer max-w-[200px] min-w-[190px] border-2 border-black flex items-center justify-center px-3 py-2'>
                                <ICON className='mr-3' icon={IconSolid.faShoppingCart} />
                                <h3 className='font-medium text-base'>
                                    Thêm vào giỏ hàng
                                </h3>
                            </div>

                            <div className='bg-yellow-300 max-w-[200px] min-w-[190px]  '>
                                <h3 className='text-white font-medium text-center px-5 py-2'>
                                    Mua Ngay
                                </h3>
                            </div>

                        </div>



                    </div>

                </div>
            </MainLayout>
        </>
    )
}

export default DetailProductById



// product?.products.map((item: Product, index: number) => {
//     if (
//         item.option.optionID == 2
//     ) {
//         return <>
//             {/* <h3 className='font-medium '>
//                 {
//                     item.option.optionName
//                 }

//                 {
//                     productSkuChoose.size
//                 }

//             </h3> */}
//             <div className='flex flex-wrap  my-3 '>
//                 {
//                     item.option.optionValues.map((item1: OptionValues) => {
//                         if (item1.id.productId == query.idproduct?.toString() as number)
//                             return <>
//                                 <div onClick={() => {
//                                     console.log(
//                                         item1.valuesName
//                                     )
//                                     setProductSkuChoose({
//                                         ...productSkuChoose,
//                                         valuesId: item1.id.valueId.toString(),
//                                         optionId: item1.id.optionId.toString()

//                                     })
//                                     setChooseSize(item1.valuesName)
//                                 }} className={'hover:cursor-pointer flex items-center justify-center w-16 mx-2 my-2 py-3 ' + `${chooseSize !== item1.valuesName ? " bg-slate-200" : " bg-yellow-300"}`}>
//                                     <p className={'font-medium  text-center ' + `${chooseSize !== item1.valuesName ? " text-black " : " text-white"}`}>
//                                         {item1.valuesName}
//                                         {/* {item.option.optionID} {item1.id.optionId} {item1.id.productId} {item1.id.valueId} {item.} */}
//                                     </p>
//                                 </div>
//                             </>
//                     })
//                 }
//             </div>
//         </>
//     }

// })