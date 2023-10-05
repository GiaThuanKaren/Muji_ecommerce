import { useRouter } from 'next/router'
import React from 'react'
import { InputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { linkRouting } from 'src/utils/routelink'

function Resetpassword() {
    const [customerInfo, setCustomerInfo] = React.useState({
        password: "",
        repassword: ""
    })
    const {
        query,
        push,
        isReady
    } = useRouter()
    React.useEffect(() => {

    }, [isReady])

    if (isReady && !query?.token) {
        return <>
            <MainLayout>
                <div className='flex w-full h-screen items-center justify-center '>
                    <div>
                        <h3 className='font-medium text-xl'>
                            Invalid Token
                        </h3>
                        <div onClick={() => {
                            push(linkRouting.home)
                        }} className='my-3 bg-blue-300 hover:cursor-pointer'>
                            <h3 className='text-center text-white font-medium py-1 px-2'>
                                Back to Home
                            </h3>
                        </div>
                    </div>

                </div>
            </MainLayout>
        </>
    }

    return (
        <>
            <MainLayout>

                <div className='w-full h-screen flex items-center justify-center bg-white'>
                    <div className='w-[50%]  '>
                        <h3 className='text-center font-medium'>
                            Reset Password
                        </h3>
                        <InputComp

                            leftText={"New Password"}
                            placeholder="New Password"
                            onChangeCallBack={(e) => {
                                // console.log(e.target.value)
                                setCustomerInfo({
                                    ...customerInfo,
                                    password: e.target.value
                                })
                            }}
                        />
                        {
                            customerInfo.password.trim() !=
                            customerInfo.repassword.trim()
                            &&
                            <>
                                <p>
                                    Password does not match
                                </p>
                            </>

                        }
                        <InputComp
                            leftText={"Confirm New Password"}
                            placeholder="Confirm New Password"
                            onChangeCallBack={(e) => {
                                setCustomerInfo({
                                    ...customerInfo,
                                    repassword: e.target.value
                                })
                            }}
                        />
                        {
                            customerInfo.password.trim() !=
                            customerInfo.repassword.trim()
                            &&
                            <>
                                <p>
                                    Password does not match
                                </p>
                            </>

                        }
                        <div className='w-full flex  justify-end'>
                            <button className='text-center bg-blue-400 text-white px-2 py-1'>
                                Submit
                            </button>
                        </div>

                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default Resetpassword