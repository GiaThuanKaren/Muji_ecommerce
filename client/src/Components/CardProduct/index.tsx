import React, { useCallback, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Product, ProductModel, ProductSkuModel } from 'src/Model';
import Link from 'next/link';
import { linkRouting } from 'src/utils/routelink';
import { ICON, IconSolid } from 'src/utils/icon';
// import { Navigation } from 'swiper/modules';
import queryString from 'query-string';


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
            <div className='h-[480px]   basis-1/2 md:basis-1/3 lg:basis-1/4 p-1 px-2 my-10 '>
                <div className='h-full w-full relative  '>
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
                            <p
                                className='font-medium line-clamp-2 '
                            >
                                {nameProduct}
                            </p>


                        </div>
                    </Link>

                    <div className='flex w-full absolute top-0 justify-between '>

                        <p className=' bg-[#565858] flex items-center py-1 px-2 '>
                            <p className='flex items-center '>
                                <ICON className='text-yellow-400' icon={IconSolid.faStar} />
                                <p className='text-white text-xs'>
                                    4.9
                                </p>
                            </p>
                            <p className='w-1 border-white border-r-2 mx-1 h-full'>

                            </p>
                            <p className='text-white font-medium text-xs'>
                                Đã bán 543k
                            </p>
                        </p>

                        <p className='text-center bg-red-600 text-white w-20 py-2 text-xs'>
                            50%
                        </p>

                    </div>

                    <div className='absolute bottom-0 w-full '>
                        <span className='flex items-center'>
                            <p className='font-bold mr-5'>329.000đ</p>
                            <p className=' line-through  text-gray-400'>329.000đ</p>
                        </span>

                        <Swiper
                            className=''
                            ref={sliderRef}
                            slidesPerView={5}
                            spaceBetween={30}
                            navigation={true} modules={[Navigation]}
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
                    </div>
                    {/* <div className="prev-arrow" onClick={handlePrev} />
                    <div className="next-arrow" onClick={handleNext} /> */}
                </div>

            </div>
        </>
    )
}

export default CardProduct