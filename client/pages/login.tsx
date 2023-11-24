import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { MainLayout } from 'src/Layouts'
import { useGlobal } from 'src/hook'
import { LoginCustomer } from 'src/service/api'
import { _addUserToStore } from 'src/store/app/slices/authSlices'
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
    const { push } = useRouter()
    const {dispatch,globalState} =useGlobal()
    
    const [isLoading, setIsLoading] = React.useState(false)
    const [customerInfo, setCustomerInfo] = React.useState({
        customerEmail: "",
        password: "",
    })

    const handleLogin = async function () {
        try {
            setIsLoading(true)
            let result = await LoginCustomer(customerInfo);
            console.log(result[0])
            dispatch(_addUserToStore(result[0]))
            if (result != false) {
                push(linkRouting.home)
            }
        } catch (error) {

        }
        finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <MainLayout isLoading={isLoading}>
                <div className=' h-screen overflow-hidden flex justify-center bg-white'>
                    <div className='mt-20 w-[20%]'>
                        <h3 className='font-medium text-2xl text-center'>Đăng Nhập</h3>
                        <input onChange={(e) => {
                            setCustomerInfo({
                                ...customerInfo,
                                customerEmail: e.target.value
                            })
                        }} placeholder='Email' type="email" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        <input onChange={(e) => {
                            setCustomerInfo({
                                ...customerInfo,
                                password: e.target.value
                            })
                        }} placeholder='Mật Khẩu' type="password" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        <div className='flex my-4'>
                            <input type="checkbox" name="" id="" />
                            <p className='ml-3'>Remember me</p>
                        </div>

                        <div onClick={handleLogin} className='h-12 my-3 bg-blue-300 rounded-lg flex items-center justify-center hover:cursor-pointer hover:bg-blue-400 transition-all'>
                            <p className='text-center text-white  font-medium'>Đăng Nhập</p>
                        </div>
                        <div onClick={() => {
                            push(`${linkRouting.fogotpassword}`)
                        }} className='hover:cursor-pointer h-12 my-3  rounded-lg flex items-center justify-center'>
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