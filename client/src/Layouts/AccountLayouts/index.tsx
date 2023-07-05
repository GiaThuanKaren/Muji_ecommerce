import { icon } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { ICON, IconRegular, IconSolid } from 'src/utils/icon'
import { linkRouting } from 'src/utils/routelink';

interface Props {
    children: React.ReactNode
}

interface ItemSideBarInf {
    text: string;
    icon: JSX.Element;
    link?: string
}

function AccountLayouts({ children }: Props) {
    const ItemsideBar: ItemSideBarInf[] = [
        {
            icon: <ICON className='mr-4' icon={IconRegular.faCircleUser} />,
            text: "Tài khoản của tôi",
            link: "/account"
        },
        {
            icon: <ICON className='mr-4' icon={IconSolid.faBoxesPacking} />,
            text: "Đơn hàng của tôi",
            link: linkRouting.donhangcuatoi
        },
        {
            icon: <ICON className='mr-4' icon={IconSolid.faLock} />,
            text: "Đổi Mật khẩu",
            link: linkRouting.changepassword
        },
        {
            icon: <ICON className='mr-4' icon={IconSolid.faLocationDot} />,
            text: "Địa chỉ",
            link: linkRouting.diachi
        },
        {
            icon: <ICON className='mr-4' icon={IconSolid.faBoxesStacked} />,
            text: "Đã xem gần đây",
            link: linkRouting.viewrecently
        },
        {
            icon: <ICON className='mr-4' icon={IconRegular.faHeart} />,
            text: "sản phẩm yêu thích ",
            link: linkRouting.productliked
        },

    ]


    const router = useRouter();


    return (
        <>
            <div className='w-full   '>
                <p className='text-center'>Trang Chủ / Tài Khoản </p>
                <p className='uppercase text-center text-yellow-300 font-bold'>Tài Khoản</p>
                <div className=' h-full'>
                    <div className=' h-full w-full flex justify-between min-h-[700px]'>
                        <div className='basis-1/5 min-h-[700px]   px-3 py-2'>
                            <div className='bg-gray-50 h-full w-full py-5 px-2'>
                                <div className='flex items-center justify-center'>
                                    <div className='h-20 w-20 rounded-full overflow-hidden'>
                                        <img
                                            className='h-full w-full '
                                            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/account_ava.jpg?1688013028339"
                                            alt="" />
                                    </div>

                                </div>
                                <p className='text-center font-medium mt-10'>Thuận Gia </p>
                                <p className='bg-yellow-500 text-white font-medium w-full py-1  text-center my-2 rounded-lg'>
                                    Đăng Xuất
                                </p>
                                <ul className='my-10'>
                                    {
                                        ItemsideBar.map((item: ItemSideBarInf, index: number) => {
                                            return <>
                                                <li className={`${router.asPath == item.link && " bg-[#feeeea] text-[#fcaf17]"}` + ' py-2 px-2 hover:bg-[#feeeea] hover:text-[#fcaf17] '}>
                                                    <Link href={item.link as string} className='flex items-center'>
                                                        {item.icon}
                                                        <p className='capitalize'>{item.text} </p>
                                                    </Link>
                                                </li>
                                            </>
                                        })
                                    }


                                </ul>
                            </div>
                        </div>




                        <div className='flex-1 min-h-[700px] px-3 py-2'>
                            <div className='bg-gray-50 h-full w-full py-5 px-2'>
                                {children}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountLayouts