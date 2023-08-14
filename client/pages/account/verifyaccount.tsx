import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import { MainLayout } from 'src/Layouts'
import { VerifyAccountByToken } from 'src/service/api';

interface VerifyaccountINF {
    token?: string
}


function Verifyaccount() {
    const { query, isReady, push } = useRouter();
    const { token } = query
    const [message, setMessage] = React.useState<"Done" | "Token Expired" | "Invalid Token">()

    async function FetchApi() {
        try {
            let result = await VerifyAccountByToken(token as string);
            console.log(result)
            if (result?.message == "Done") {
                push("/")
            } else {
                setMessage(result?.message)
            }

        } catch (error) {

        }
    }


    React.useEffect(() => {
        if (isReady) {
            console.log(token)
            FetchApi()
        }
    }, [isReady])

    if (isReady && !token) {
        return <>
            <MainLayout>
                <div className='min-h-screen'>
                    <div className='w-full h-full flex justify-center items-center'>
                        <div className='min-h-[100px] my-10'>
                            <h3 className='font-medium text-black text-center text-4xl'>
                                No Token
                            </h3>
                            <Link href={"/"}>
                                <div className="bg-blue-400 rounded-lg hover:bg-blue-300 transition-all hover:cursor-pointer">
                                    <h3 className='font-medium py-2  text-center my-10 text-xl text-white'>
                                        Back To Home
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    }


    if (message == "Invalid Token") {
        return <>
            <MainLayout>
                <div className='min-h-screen'>
                    <div className='w-full h-full flex justify-center items-center'>
                        <div className='min-h-[100px] my-10'>
                            <h3 className='font-medium text-black text-center text-4xl'>
                                {message}
                            </h3>
                            <Link href={"/"}>
                                <div className="bg-blue-400 rounded-lg hover:bg-blue-300 transition-all hover:cursor-pointer">
                                    <h3 className='font-medium py-2  text-center my-10 text-xl text-white'>
                                        Back To Home
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    }

    if (message == "Token Expired") {
        return <>
            <MainLayout>
                <div className='min-h-screen'>
                    <div className='w-full h-full flex justify-center items-center'>
                        <div className='min-h-[100px] my-10'>
                            <h3 className='font-medium text-black text-center text-4xl'>
                                {message}
                            </h3>
                            <Link href={"/"}>
                                <div className="bg-blue-400 rounded-lg hover:bg-blue-300 transition-all hover:cursor-pointer">
                                    <h3 className='font-medium py-2  text-center my-10 text-xl text-white'>
                                        Back To Home
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    }

    return (
        <>
            <MainLayout>
                <div className='min-h-screen  '>
                    <div className='w-full flex items-center justify-center'>
                        <h3>

                        </h3>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default Verifyaccount