import Link from 'next/link'
import React from 'react'
import { MainLayout } from 'src/Layouts'
import { ICON, IconSolid, IconBrand } from 'src/utils/icon'
import { linkRouting } from 'src/utils/routelink'

type providerItem = {
    name: string,
    icon: JSX.Element,

}

function RegisterPage() {
    const provider: providerItem[] = [
        {
            name: "google",
            icon: <ICON icon={IconBrand.faGoogle} />

        }, {
            name: "facebook",
            icon: <ICON icon={IconBrand.faFacebook} />
        }
    ]
    return (
        <>
            <MainLayout>
                <div className='overflow-hidden flex justify-center bg-white mb-20'>
                    <div className='mt-20 w-[20%]'>
                        <h3 className='font-medium text-2xl text-center'>Đăng Ký</h3>
                        <input type="text" placeholder='Username' name="" id="" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        <input placeholder='Email' type="email" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        <input placeholder='Mật Khẩu' type="password" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        <input placeholder='Xác Nhận Mật Khẩu' type="password" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        {/* <div className='flex my-4'>
                        <input type="checkbox" name="" id="" />
                        <p className='ml-3'>Remember me</p>
                    </div> */}

                        <div className='h-12 my-3 bg-blue-300 rounded-lg flex items-center justify-center'>
                            <p className='text-center text-white  font-medium'>Đăng Nhập</p>
                        </div>
                        {/* <div className='h-12 my-3  rounded-lg flex items-center justify-center'>
                        <p className='text-center text-blue-300  font-medium'>Quên mật khẩu</p>
                    </div> */}

                        <div className='h-12 my-3  rounded-lg flex items-center justify-center'>
                            <Link href={``} className='text-black font-medium mx-1'>
                                Bạn đã có tài khoản ?
                            </Link>
                            <Link href={`${linkRouting.login}`} className='text-blue-300 font-medium mx-1'>
                                Đăng Nhập
                            </Link>
                        </div>
                        <div className='flex items-center justify-center'>
                            {
                                provider.map((item: providerItem, index: number) => {
                                    return <>
                                        <div className="flex items-center mx-4">
                                            {item.icon}
                                            <p className='mx-3 capitalize font-medium'>{item.name}</p>
                                        </div>
                                    </>
                                })
                            }

                        </div>
                    </div>
                </div>
            </MainLayout>

        </>
    )
}

export default RegisterPage