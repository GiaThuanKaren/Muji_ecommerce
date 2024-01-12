import Link from 'next/link';
import React from 'react'
import { ICON, IconSolid } from 'src/utils/icon';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import CardProduct from '../CardProduct';
import { ProductMock } from 'src/utils/constant';
import { GetProductRowDisplay } from 'src/service/api';

interface Props {
    title: string;
    link: string;
    id: string
}

function HorizontalProductList({ id, link, title }: Props) {

    const [data, setData] = React.useState<any[]>([])


    React.useEffect(() => {
        async function FetchApi() {
            try {
                let result = await GetProductRowDisplay(id)
                setData(result)
            } catch (error) {

            }
        }
        FetchApi()
    }, [])
    console.log(data, "Fetch")


    return (
        <>
            <div className='w -full h-fit mt-3 mb-10'>
                <div className='flex items-center justify-between my-3'>
                    <p className='font-bold uppercase text-lg'>
                        {
                            `Yody - ${title} `
                        }
                    </p>
                    <Link className='flex items-center' href={link}>
                        <p className='font-medium '>Xem Thêm </p>
                        <ICON className='ml-3' icon={IconSolid.faChevronRight} />
                    </Link>
                </div>
                <div className='flex items-center'>
                    <div className='hidden md:block md:w-[20%]'>
                        <div>
                            <img
                                src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_preivew_sanpham_2_image_desktop.jpg?1687694911598"
                                alt="" />
                        </div>
                    </div>
                    <div className='w-full md:w-[80%] '>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={30}

                            modules={[Pagination, Navigation]}
                            navigation
                            className="mySwiper h-fit "
                        >
                            {
                                data.map((item, index) => {
                                    return <>
                                        <SwiperSlide>
                                            <CardProduct {...item} />
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