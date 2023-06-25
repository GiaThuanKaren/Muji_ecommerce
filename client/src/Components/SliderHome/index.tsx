import React from 'react'
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
function SliderHome() {
    let ImageSlide: string[] = [
        "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/slider_1.jpg?1687673070998",
        "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/slider_2.jpg?1687673070998",
        "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/slider_3.jpg?1687673070998",
        "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/slider_5.jpg?1687673070998"
    ]
    return (
        <>
            <div className='h-fit w-full'>
                <Swiper
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper h-full">
                    {
                        ImageSlide.map((item: string, index: number) => {
                            return <>
                                <SwiperSlide>
                                    <div className='w-full h-full'>
                                        <img src={item} className='w-full' alt="" />
                                    </div>
                                </SwiperSlide>
                            </>
                        })
                    }


                </Swiper>
            </div>
        </>
    )
}

export default SliderHome