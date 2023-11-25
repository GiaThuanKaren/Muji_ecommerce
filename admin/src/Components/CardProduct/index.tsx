import Link from 'next/link';
import { ProductSkuChooseInf } from 'pages/pos';
import React, { Dispatch, useCallback, useRef } from 'react'
import { ProductPOSModel, ProductResponeModel, ProductSkuPOSModel, ProductSkuResponeModel } from 'src/Model/apiModel';
import { AddProductToLocalStorage } from 'src/services/api';
import { ProductCartItem, localStorageInf } from 'src/utils/constant';
import { Swiper, SwiperSlide } from "swiper/react";


interface CardCartInf extends ProductCartItem {
    // onChooseProduct?: (item: ProductCartItem) => any
    setStorageOrders: (order: localStorageInf) => void
    setProductChoose: (id: string) => void
}

type ProductCart =  CardCartInf & { product: ProductResponeModel }

function CardProduct({ item, product, quantity, setStorageOrders, setProductChoose }: ProductCart) {

    const { productId, productSkus, nameProduct } = product
    const sliderRef = useRef(null);

    const [imageProductSku, setImageProductSku] = React.useState(() => {
        if (productSkus && productSkus?.length > 0)
            return productSkus[0].imageProduct
        else
            return "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/tsn6128-tr1-ssn6020-tit-muu6006-nav-8.jpg?v=1685151599000"
        // return `https://drive.google.com/uc?export=view&id=${productSkus[0].imageProduct}`
    })
    const [price, setPrice] = React.useState(() => {
        if (productSkus && productSkus.length > 0) 
            return productSkus[0].price
        else 
            return 329000
    });
    const [quantityCart, setQuantityCart] = React.useState<number>(quantity as number);
    const [totalPrice, setTotalPrice] = React.useState(quantity * price);

    React.useEffect(() => {
        // setProductSkuChoose({
        //     img: imageProductSku as string,
        //     productSkuId: '',
        //     size: '',
        //     skuName: '',
        //     productId: productId.toString() as string,
        //     price: price as number,
        // })
    }, [])

    const HandleAddCart = async function () {
        try {

            setProductChoose(productId.toString())
      
            // let productAddCart: ProductCartItem = {
                // item: {
                    // image: imageProductSku as string,
                    // productsku: '',
                    // size: '',
                    // productId: productId.toString() as string,
                    // price: price as number,
                    // name: ''

                    // image: productSkuChoose.img,
                    // productId: productSkuChoose.productId as string,
                    // productsku: productSkuChoose.productSkuId,
                    // size: productSkuChoose.size,
                    // name: product?.nameProduct as string,
                    // price: productSkuChoose.price
                // },
                // quantity: 1,
            // }


            // console.log(productAddCart)
            // AddProductToLocalStorage(productAddCart)

            // const store = localStorage.getItem('muji_order')
            // if (store) setStorageOrders(JSON.parse(store))
        } catch (error) {

        }
    }

    const HandleCheckout = () => {
        try {
            
        } catch (error) {
            
        }
    }


    // const handlePrev = useCallback(() => {
    //     if (!sliderRef.current) return;
    //     sliderRef.current.swiper.slidePrev();
    // }, []);

    // const handleNext = useCallback(() => {
    //     if (!sliderRef.current) return;
    //     sliderRef.current.swiper.slideNext();
    // }, []);


    return (
        <>
            <div className='basis-1/2 md:basis-1/3 lg:basis-1/4 max-w-[140px] py-2 px-2 my-5 overflow-hidden shadow-lg '
            >
                <div className="h-full w-full">
                    <div className='block'>
                        <div className='h-[80%] w-full '>
                            <img
                                onClick={HandleAddCart}
                                className='w-full h-max object-cover rounded-t-md'
                                src=
                                {
                                    imageProductSku?.startsWith("https://") ? imageProductSku
                                        : `https://drive.google.com/uc?export=view&id=${imageProductSku}`

                                }
                                alt=""
                            />
                        </div>
                        <div className='h-[20%] w-full text-[13.5px] pt-2'>
                            <p>
                                {nameProduct}
                            </p>
                            <p className='font-medium'>{price}đ</p>

                        </div>
                    </div>
                    <Swiper
                        ref={sliderRef}
                        slidesPerView={5}
                        spaceBetween={30}

                    // navigation={true}
                    // pagination={{
                    //     el: ".swiper-pagination", // Use a valid DOM element here
                    //     type: "bullets",
                    //     clickable: true,
                    //     bulletClass: "bg-amber-400",
                    //     bulletActiveClass: "bg-green-400",
                    // }}
                    // modules={[Pagination, Navigation]}
                    // className="mySwiper"
                    wrapperClass='flex'
                    >
                        {
                            productSkus.map((item: ProductSkuResponeModel, index) => {
                                // console.log(item.imageProduct)
                                return <>
                                    <SwiperSlide onClick={(e) => {
                                        e.stopPropagation();
                                        setImageProductSku(() => {

                                            return item.imageProduct?.startsWith("https://") ? item.imageProduct
                                                : `https://drive.google.com/uc?export=view&id=${item.imageProduct}`

                                        });
                                        // setProductSkuChoose({
                                        //     ...productSkuChoose,
                                        //     img: item.imageProduct,
                                        //     productId: item.id.productId.toString(),
                                        //     productSkuId: item.id.skuId.toString() as string,
                                        //     size: "",
                                        //     skuName: item.skuName,
                                        //     price: item.price
                                        // })
                                        console.log("Choose Product Sku")
                                    }} key={index}>
                                        <div className='h-full  w-full p-2 my-2 '>
                                            <div className=' bg-red-500 rounded-full overflow-hidden border-[1px] border-gray-200  h-8 w-8'>
                                                <img
                                                    className='w-full h-max object-cover'
                                                    src=
                                                    {

                                                        item.imageProduct?.startsWith("https://") ? item.imageProduct
                                                            : `https://drive.google.com/uc?export=view&id=${item.imageProduct}`

                                                    }
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </>
                            })
                        }
                    </Swiper>
                    {/* <div className="prev-arrow" onClick={handlePrev} />
                    <div className="next-arrow" onClick={handleNext} /> */}
                </div>

            </div>
        </>
    )
}

export default CardProduct