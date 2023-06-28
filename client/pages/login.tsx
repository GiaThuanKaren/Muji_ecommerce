import Link from 'next/link'
import React from 'react'
import { MainLayout } from 'src/Layouts'
import { ICON, IconBrand } from 'src/utils/icon'
import { linkRouting } from 'src/utils/routelink'

type providerItem = {
    name: string,
    icon: JSX.Element,

}
function LoginPage() {
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
                <div className=' h-screen overflow-hidden flex justify-center bg-white'>
                    <div className='mt-20 w-[20%]'>
                        <h3 className='font-medium text-2xl text-center'>Đăng Nhập</h3>
                        <input placeholder='Email' type="email" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        <input placeholder='Mật Khẩu' type="password" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        <div className='flex my-4'>
                            <input type="checkbox" name="" id="" />
                            <p className='ml-3'>Remember me</p>
                        </div>

                        <div className='h-12 my-3 bg-blue-300 rounded-lg flex items-center justify-center'>
                            <p className='text-center text-white  font-medium'>Đăng Nhập</p>
                        </div>
                        <div className='h-12 my-3  rounded-lg flex items-center justify-center'>
                            <p className='text-center text-blue-300  font-medium'>Quên mật khẩu</p>
                        </div>

                        <div className='h-12 my-3  rounded-lg flex items-center justify-center'>
                            <Link href={``} className='text-black font-medium mx-1'>
                                Bạn chưa có tài khoản ?
                            </Link>
                            <Link href={`${linkRouting.register}`} className='text-blue-300 font-medium mx-1'>
                                Đăng ký
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

export default LoginPage