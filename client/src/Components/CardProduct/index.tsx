import React, { useCallback, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Product, ProductModel, ProductSkuModel } from 'src/Model';
import Link from 'next/link';
import { linkRouting } from 'src/utils/routelink';



function CardProduct({ nameProduct, productId, productSkus, productDescription }: ProductModel) {
    const sliderRef = useRef(null);
    const [data, setData] = React.useState(() => {
        return Array.from(Array(10).keys())
    })
    const [imageProductSku, setImageProductSku] = React.useState(() => {
        if (productSkus && productSkus?.length > 0)
            return productSkus[0].imageProduct
        else
            return "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/tsn6128-tr1-ssn6020-tit-muu6006-nav-8.jpg?v=1685151599000"
        // return `https://drive.google.com/uc?export=view&id=${productSkus[0].imageProduct}`
    })

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
            <div className='h-fit  basis-1/2 md:basis-1/4 lg:basis-1/5 p-1 px-2 my-10 overflow-hidden'>
                <div className='h-full w-full'>
                    <Link className='block' href={`${linkRouting.detailproduct}/${productId}`}>
                        <div className='h-[80%] w-full '>
                            <img
                                className='w-full h-max object-cover'
                                src=
                                {
                                    imageProductSku?.startsWith("https://") ? imageProductSku
                                        : `https://drive.google.com/uc?export=view&id=${imageProductSku}`

                                }
                                alt=""
                            />
                        </div>
                        <div className='h-[20%] w-full'>
                            <p>
                                {nameProduct}
                            </p>
                            <p className='font-medium'>329.000đ</p>

                        </div>
                    </Link>
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
                    >
                        {
                            productSkus.map((item: ProductSkuModel, index) => {
                                console.log(item.imageProduct)
                                return <>
                                    <SwiperSlide onClick={(e) => {
                                        e.stopPropagation();
                                        setImageProductSku(() => {

                                            return item.imageProduct?.startsWith("https://") ? item.imageProduct
                                                : `https://drive.google.com/uc?export=view&id=${item.imageProduct}`

                                        });
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