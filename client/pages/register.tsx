import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import { MainLayout } from 'src/Layouts'
import { RegisterModel } from 'src/Model'
import { NewUserRegister } from 'src/service/api'
import { ICON, IconSolid, IconBrand } from 'src/utils/icon'
import { linkRouting } from 'src/utils/routelink'

type providerItem = {
    name: string,
    icon: JSX.Element,

}

function RegisterPage() {
    const {
        push
    } = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)
    const [customerInfo, setCustomerInfo] = React.useState({
        customerEmail: "",
        customerFirstName: "",
        customerLastName: "",
        customerPhone: "",
        password: "",
        repassword: "",
    })

    const handleInput = function (key:
        "customerEmail" |
        "customerFirstName" |
        "customerLastName" |
        "customerPhone" |
        "password" |
        "repassword",
        value: any
    ) {
        setCustomerInfo({
            ...customerInfo,
            [key]: value
        })
    }

    const provider: providerItem[] = [
        {
            name: "google",
            icon: <ICON icon={IconBrand.faGoogle} />

        }, {
            name: "facebook",
            icon: <ICON icon={IconBrand.faFacebook} />
        }
    ]



    const handleRegister = async function () {
        try {
            const { repassword, ...customerRegisterModel } = customerInfo
            setIsLoading(true)
            await NewUserRegister(customerRegisterModel)
            push(linkRouting.login)
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <MainLayout isLoading={isLoading}>
                <div className='overflow-hidden flex justify-center bg-white mb-20'>
                    <div className='mt-20 w-[20%]'>
                        <h3 className='font-medium text-2xl text-center'>Đăng Ký</h3>
                        <input onChange={(e) => {
                            handleInput("customerFirstName", e.target.value)
                        }} type="text" placeholder='First Name' name="" id="" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        <input
                            onChange={(e) => {
                                handleInput("customerLastName", e.target.value)
                            }}
                            type="text" placeholder='Last Name' name="" id="" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        <input
                            onChange={(e) => {
                                handleInput("customerEmail", e.target.value)
                            }}
                            placeholder='Email' type="email" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        <input onChange={(e) => {
                            handleInput("password", e.target.value)
                        }} placeholder='Mật Khẩu' type="password" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        <p className='text-red-500 font-medium'>
                            {customerInfo.password != customerInfo.repassword && "Password does not match"}
                        </p>
                        <input onChange={(e) => {

                            handleInput("repassword", e.target.value)
                        }} placeholder='Xác Nhận Mật Khẩu' type="password" className="block w-full h-10 bg-gray-100 my-3 px-3 py-5 rounded-md" />
                        {/* <div className='flex my-4'>
                        <input type="checkbox" name="" id="" />
                        <p className='ml-3'>Remember me</p>
                    </div> */}
                        <p className='text-red-500 font-medium'>
                            {customerInfo.password != customerInfo.repassword && "Password does not match"}
                        </p>

                        <div onClick={handleRegister} className='h-12 my-3 bg-blue-300 rounded-lg flex items-center justify-center hover:cursor-pointer'>
                            <p className='text-center text-white  font-medium'>Đăng Ký</p>
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