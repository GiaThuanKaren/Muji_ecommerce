import { useRouter } from 'next/router';
import React from 'react'
import { CommentCompononent } from 'src/Components';
import { MainLayout } from 'src/Layouts'
import { OptionValues, Product, ProductModel, ProductSkuModel } from 'src/Model';
import { GetDetailProductById } from 'src/service/api';
import { ICON, IconRegular, IconSolid } from 'src/utils/icon'


interface ProductSkuChooseInf {
    img: string,
    productSkuId: string,
    size: string,
    skuName: string

}


function DetailProductById() {
    const { query, isReady } = useRouter()
    const [productSkuChoose, setProductSkuChoose] = React.useState<ProductSkuChooseInf>({
        img: "",
        productSkuId: "",
        size: "",
        skuName: ""
    })
    const [product, setProduct] = React.useState<ProductModel>()
    const [currentProductSku, setCurrentProductSku] = React.useState<ProductSkuModel>()
    const size: string[] = ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
    const ratingStart: string[] = ["Tất Cả", "5 Sao", "4 Sao", "3 Sao", "2 Sao"];
    const [numberProductAddToCard, setNumberProductAddToCard] = React.useState(1);
    const [chooseSize, setChooseSize] = React.useState(
        ""
    )
    async function FetchApi() {
        try {
            let result = await GetDetailProductById(query?.idproduct as string);
            console.log(result?.data)
            setProductSkuChoose({
                img: result?.data.productSkus[0].imageProduct.toString().trim().startsWith("https://") ? result?.data.productSkus[0].imageProduct : `https://drive.google.com/uc?export=view&id=${result?.data.productSkus[0].imageProduct}` as string,
                productSkuId: result?.data.productSkus[0].id.skuId.toString() as string,
                size: "",
                skuName: result?.data.productSkus[0].skuName as string
            })
            setProduct(result?.data as ProductModel)
        } catch (error) {

        }
    }
    React.useEffect(() => {
        if (isReady) {
            console.log("Ready")
            FetchApi()
        }
    }, [isReady])
    console.log(product)
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
                                <div className='flex flex-wrap w-full my-3'>
                                    {
                                        product?.productSkus.map((item: ProductSkuModel) => {
                                            return <>
                                                <div onClick={() => {
                                                    setProductSkuChoose({
                                                        img: item.imageProduct,
                                                        productSkuId: item.id.skuId.toString() as string,
                                                        size: "",
                                                        skuName: item.skuName
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
                                {
                                    product?.products.map((item: Product, index: number) => {
                                        if (
                                            item.option.optionID == 252
                                        ) {
                                            return <>
                                                <h3 className='font-medium '>
                                                    {
                                                        item.option.optionName
                                                    }

                                                    {
                                                        productSkuChoose.size
                                                    }

                                                </h3>
                                                <div className='flex flex-wrap  my-3 '>
                                                    {
                                                        item.option.optionValues.map((item1: OptionValues) => {
                                                            return <>
                                                                <div onClick={() => {
                                                                    setChooseSize(item1)
                                                                }} className={'hover:cursor-pointer flex items-center justify-center w-16 mx-2 my-2 py-3 ' + `${chooseSize !== item1 ? " bg-slate-200" : " bg-yellow-300"}`}>
                                                                    <p className={'font-medium  ' + `${chooseSize !== item1.valuesName ? " text-black " : " text-white"}`}>
                                                                        {item1.valuesName}
                                                                    </p>
                                                                </div>
                                                            </>
                                                        })
                                                    }
                                                </div>
                                            </>
                                        }

                                    })
                                }


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
                        <div className='flex flex-wrap w-full my-3'>
                            {
                                product?.productSkus.map((item: ProductSkuModel) => {
                                    return <>
                                        <div onClick={() => {
                                            setProductSkuChoose({
                                                img: item.imageProduct,
                                                productSkuId: item.id.skuId.toString() as string,
                                                size: "",
                                                skuName: item.skuName
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
                        {
                            product?.products.map((item: Product, index: number) => {
                                if (
                                    item.option.optionID == 252
                                ) {
                                    return <>
                                        <h3 className='font-medium '>
                                            {
                                                item.option.optionName
                                            }

                                            {
                                                productSkuChoose.size
                                            }

                                        </h3>
                                        <div className='flex flex-wrap  my-3 '>
                                            {
                                                item.option.optionValues.map((item1: OptionValues) => {
                                                    return <>
                                                        <div onClick={() => {
                                                            setChooseSize(item1)
                                                        }} className={'hover:cursor-pointer flex items-center justify-center w-16 mx-2 my-2 py-3 ' + `${chooseSize !== item1 ? " bg-slate-200" : " bg-yellow-300"}`}>
                                                            <p className={'font-medium  ' + `${chooseSize !== item1.valuesName ? " text-black " : " text-white"}`}>
                                                                {item1.valuesName}
                                                            </p>
                                                        </div>
                                                    </>
                                                })
                                            }
                                        </div>
                                    </>
                                }

                            })
                        }


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
                </div>
            </MainLayout>
        </>
    )
}

export default DetailProductById