import Link from 'next/link';
import React from 'react'
import { ICON, IconSolid } from 'src/utils/icon';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import CardProduct from '../CardProduct';

interface Props {
    title: string;
    link: string;
}

function HorizontalProductList({ link, title }: Props) {
    return (
        <>
            <div className='w -full h-fit mt-3 mb-10'>
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>Breast Cancer Semantic Segmentation (BCSS) dataset</p>
                    <Link className='flex items-center' href={link}>
                        <p className='font-medium '>Xem Thêm </p>
                        <ICON className='ml-3' icon={IconSolid.faChevronRight} />
                    </Link>
                </div>

                <div className='flex items-center'>
                    <div className='w-[20%]'>
                        <div>
                            <img src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_preivew_sanpham_2_image_desktop.jpg?1687694911598" alt="" />
                        </div>
                    </div>
                    <div className='w-[80%]'>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper h-fit"
                        >
                            {
                                Array.from(Array(10).keys()).map((item, index) => {
                                    return <>
                                        <SwiperSlide>
                                            <CardProduct />
                                        </SwiperSlide>

                                    </>
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HorizontalProductList