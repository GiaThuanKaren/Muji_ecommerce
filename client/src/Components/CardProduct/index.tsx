import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

function CardProduct() {
    const [data, setData] = React.useState(() => {
        return Array.from(Array(10).keys())
    })
    return (
        <>
            <div className='h-fit max-h-[500px] basis-1/2 md:basis-1/4 p-1 my-10'>
                <div className='h-full w-full'>
                    <div className='h-[80%] w-full '>
                        <img
                            className='w-full h-full object-cover'
                            src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/tsn6128-tr1-ssn6020-tit-muu6006-nav-8.jpg?v=1685151599000" alt=""
                        />
                    </div>
                    <div className='h-[20%] w-full'>
                        <p>Áo Thun Nữ In Gấu Bột Ngô</p>
                        <p className='font-medium'>329.000đ</p>

                    </div>
                    <Swiper
                        navigation={true}
                        slidesPerView={3}
                        spaceBetween={30}
                        centeredSlides={true}
                        pagination={{
                            clickable: true,
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
            </div>
        </>
    )
}

export default CardProduct