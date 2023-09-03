import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Product, ProductModel } from 'src/Model';
import Link from 'next/link';
import { linkRouting } from 'src/utils/routelink';



function CardProduct({ nameProduct, productId, productSkus, productDescription }: ProductModel) {
    const [data, setData] = React.useState(() => {
        return Array.from(Array(10).keys())
    })
    const [imageProductSku, setImageProductSku] = React.useState(() => {
        if (productSkus.length > 0)
            return `https://drive.google.com/uc?export=view&id=${productSkus[0].imageProduct}`
        return "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/tsn6128-tr1-ssn6020-tit-muu6006-nav-8.jpg?v=1685151599000"
    })
    return (
        <>
            <div className='h-fit  basis-1/2 md:basis-1/4 lg:basis-1/5 p-1 px-2 my-10 overflow-hidden'>
                <Link className='block' href={`${linkRouting.detailproduct}/${productId}`}>
                    <div className='h-full w-full'>
                        <div className='h-[80%] w-full '>
                            <img
                                className='w-full h-full object-cover'
                                src={imageProductSku}
                                alt=""
                            />
                        </div>
                        <div className='h-[20%] w-full'>
                            <p>
                                {nameProduct}
                            </p>
                            <p className='font-medium'>329.000đ</p>

                        </div>
                        <Swiper
                            navigation={true}
                            slidesPerView={3}
                            spaceBetween={30}

                            pagination={{
                                el: ".swiper-pagination", // Use a valid DOM element here
                                type: "bullets",
                                clickable: true,
                                bulletClass: "bg-amber-400",
                                bulletActiveClass: "bg-green-400",
                            }}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {
                                data.map((item, index) => {
                                    return <>
                                        <SwiperSlide key={index}>
                                            <div className='h-full  w-full p-2 my-10'>
                                                <div className=' bg-red-500 rounded-full   h-10 w-10'>

                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </>
                                })
                            }
                        </Swiper>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default CardProduct