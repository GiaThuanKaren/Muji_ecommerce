import React from 'react'
import { ICON, IconRegular, IconSolid } from 'src/utils/icon'

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

    ]
    return (
        <>
            <div className='w-full   '>
                <p className='text-center'>Trang Chủ / Tài Khoản </p>
                <p className='uppercase text-center text-yellow-300 font-bold'>Tài Khoản</p>
                <div className=' h-full'>
                    <div className=' h-full w-full flex justify-between min-h-[700px]'>
                        <div className='basis-1/4 min-h-[700px]   px-3 py-2'>
                            <div className='bg-gray-50 h-full w-full py-5 px-2'>
                                <div className='flex items-center justify-center'>
                                    <div className='h-20 w-20 rounded-full overflow-hidden'>
                                        <img
                                            className='h-full w-full '
                                            src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/account_ava.jpg?1688013028339"
                                            alt="" />
                                    </div>

                                </div>
                                <p className='text-center font-medium'>Thuận Gia </p>
                                <p className='bg-yellow-500 text-white font-medium w-full py-1  text-center my-2 rounded-lg'>
                                    Đăng Xuất
                                </p>
                                <ul>
                                    <li className='flex items-center py-2 px-2 hover:bg-red-100 hover:text-red-300'>
                                        <ICON className='mr-4' icon={IconRegular.faCircleUser} />
                                        <p>Tài Khoản Của Tôi</p>
                                    </li>
                                    <li className='flex items-center py-2 px-2 hover:bg-red-100 hover:text-red-300'>
                                        <ICON className='mr-4' icon={IconSolid.faBoxesPacking} />

                                        Đơn hàng của tôi
                                    </li>
                                    <li className='flex items-center py-2 px-2 hover:bg-red-100 hover:text-red-300'>
                                        <ICON className='mr-4' icon={IconSolid.faLock} />
                                        Đổi mật khẩu</li>
                                    <li className='flex items-center py-2 px-2 hover:bg-red-100 hover:text-red-300'>
                                        <ICON className='mr-4' icon={IconSolid.faLocationDot} />
                                        Sổ địa chỉ</li>
                                    <li className='flex items-center py-2 px-2 hover:bg-red-100 hover:cursor-pointer hover:text-red-300'>
                                        <ICON className='mr-4' icon={IconSolid.faBoxesStacked} />
                                        Đã xem gần đây</li>
                                    <li className='flex items-center py-2 px-2 hover:bg-red-100 hover:text-red-300'>
                                        <ICON className='mr-4' icon={IconRegular.faHeart} />
                                        Sản phẩm yêu thích</li>
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