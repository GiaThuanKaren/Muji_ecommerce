import { error } from 'console'
import { useRouter } from 'next/router'
import React from 'react'
import { InputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { sendEmailResetPassword } from 'src/service/api'
import { ShowToast } from 'src/utils/constant'

function Fogotpassword() {
    const [email, setEmail] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const {
        push
    } = useRouter()
    const [counter, setCounter] = React.useState(0);
    const handleSendEmailResetPassword = async function () {
        try {
            setIsLoading(true)
            // let result = await sendEmailResetPassword(email);
            setCounter(60)


        } catch (error) {

        }
        finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);
    return (
        <>
            <MainLayout isLoading={isLoading}>
                <div className='w-full h-screen flex items-center justify-center'>
                    <div className='w-1/2'>
                        <h3 className='text-center font-medium text-xl my-3'>
                            Send email to reset password
                        </h3>
                        <InputComp leftText={"Email"} onChangeCallBack={(e) => {
                            setEmail(e.target.value)
                        }} type='email' />

                        <div className='mt-4 '>
                            <h3 onClick={() => {
                                if (counter == 0)
                                    handleSendEmailResetPassword()

                            }}
                                className={'hover:cursor-pointer hover:bg-blue-300 text-center bg-blue-400 w-fit px-3 py-2 text-white font-medium' + `${counter != 0 && " bg-gray-300"}`}>
                                Submit
                            </h3>
                        </div>
                        {counter > 0 && <>
                            Resend Email After : {counter === 0 ? "Time over" : counter} second
                        </>}

                    </div>

                </div>
            </MainLayout>
        </>
    )
}

export default Fogotpassword