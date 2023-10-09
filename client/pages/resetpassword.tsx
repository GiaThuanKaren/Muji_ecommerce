import { useRouter } from 'next/router'
import React from 'react'
import { InputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { VerifyTokenResetPassword } from 'src/service/api'
import { linkRouting } from 'src/utils/routelink'

function Resetpassword() {
    const [customerInfo, setCustomerInfo] = React.useState({
        password: "",
        repassword: ""
    })
    const [isLoading, setIsLoading] = React.useState(true)
    const [verifyToken, setverifyToken] = React.useState<"Required Token" | "Expired Token" | "Invalid Token" | "Verified" | "UnAuthenticated">("UnAuthenticated");
    const {
        query,
        push,
        isReady
    } = useRouter()
    async function VerifyResetTokenCustomer() {
        try {
            let result = await VerifyTokenResetPassword(query?.token as string)
            console.log(result)
            if (result == true) {
                setverifyToken("Verified")
            } else {
                setverifyToken("Invalid Token")
            }
            // setverifyToken(result as boolean);

        } catch (error) {

        }
        finally {
            setIsLoading(false)
        }
    }


    React.useEffect(() => {
        if (isReady) {

            VerifyResetTokenCustomer()
        }

    }, [isReady])
    console.log(verifyToken)
    console.log("Statement ", (isReady && !query?.token) && (verifyToken == "Invalid Token" || verifyToken == "Expired Token"))
    if ((verifyToken == "Invalid Token" || verifyToken == "Expired Token")) {
        return <>
            <MainLayout >
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
    } else
        return (
            <>
                <MainLayout isLoading={isLoading}>
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