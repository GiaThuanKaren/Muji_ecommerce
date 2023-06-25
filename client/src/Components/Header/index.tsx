import React from 'react'
import Searchinput from '../SearchInput'
import { ICON, IconRegular, IconSolid } from 'src/utils/icon'
import Link from 'next/link';
interface ItemNavBarHeaderCatologe {
    title: string;
    link: string;
    slug: string;

}


function Header() {
    const ListNavBarHeader: ItemNavBarHeaderCatologe[] = [
        {
            link: "",
            title: "Nữ",
            slug: "nu"
        },
        {
            link: "",
            title: "Nam",
            slug: "nam"
        },
        {
            link: "",
            title: "Trẻ Em",
            slug: "tre_em"
        },
        {
            link: "",
            title: "Bộ Sư Tập",
            slug: "#"
        },
        {
            link: "",
            title: "Đồng phục",
            slug: "dong_phuc"
        },
        {
            link: "",
            title: "Về Yody",
            slug: "ve_yody"
        },
        {
            link: "",
            title: "Blog",
            slug: "yody_love"
        },

    ]
    return (
        <>
            <div className='h-24 flex header_bg items-center justify-center   z-[2] fixed top-0 left-0 right-0 shadow-sm py-2'>
                <div className=' w-full  h-full xl:mx-[200px]'>

                    <div className='flex items-center justify-between'>

                        <div className=' flex items-center'>
                            <img src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/logo.svg?1687673070998" alt="" />
                            <Searchinput />
                        </div>


                        <div className='flex items-center justify-between mx-2 font-medium'>
                            <p className='block'>
                                <ICON className='mx-1' icon={IconSolid.faLocationDot} />
                                Tìm 230+ cửa hàng
                            </p>

                            <p className='flex items-center mx-2 font-medium'>
                                <ICON className='mx-1' icon={IconSolid.faPhone} />
                                1800 2086
                                <p className=' mx-1 text-center bg-yellow-500 rounded-lg p-1'>
                                    Free
                                </p>
                            </p>
                            <p className='block mx-1 font-medium'>

                                -

                                Đặt hàng gọi
                            </p>

                            <p className='flex items-center mx-2 font-medium'>
                                <ICON className='mx-2' icon={IconSolid.faPhone} />
                                02499986999

                            </p>


                        </div>
                    </div>

                    <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center justify-between'>
                            {
                                ListNavBarHeader.map((item: ItemNavBarHeaderCatologe, index: number) => {
                                    return <>
                                        <Link href={`${item.link}`}>
                                            <p className='font-medium mr-5'>{item.title}</p>
                                        </Link>
                                    </>
                                })
                            }
                        </div>

                        <div className='flex items-center justify-between'>
                            <p className='flex items-center '>
                                <div className='relative'>
                                    {/* <p className='h-3 w-3 bg-yellow-500 absolute top-0 right-0 z-[2]'>
                                        0
                                    </p> */}
                                    <ICON className='mx-3' icon={IconSolid.faBagShopping} />
                                </div>
                                {/* <ICON icon="fa-sharp fa-light fa-bag-shopping" /> */}
                                GIỏ HÀNG
                            </p>

                            <p className='ml-7'>
                                <ICON icon={IconRegular.faUser} />
                                Đăng ký / Đăng nhập
                            </p>
                        </div>




                    </div>

                </div>
            </div>

        </>
    )
}

export default Header