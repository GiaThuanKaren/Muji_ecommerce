import { useRouter } from 'next/router'
import React from 'react'
import { InputComp } from 'src/Components'
import { AccountLayouts, MainLayout } from 'src/Layouts'
import { useGlobal } from 'src/hook'
import { updateCustomer } from 'src/service/api'
import { UserStoreInf, _addUserToStore } from 'src/store/app/slices/authSlices'
import { linkRouting } from 'src/utils/routelink'




function Editinfo() {
    const {
        dispatch,
        globalState
    } = useGlobal()
    const {
        push
    } = useRouter()

    const [data, setData] = React.useState<UserStoreInf>(() => {

        return {

            customerLastName: globalState.auth.user?.customerFirstName,
            customerFirstName: globalState.auth.user?.customerLastName,
            customerPhone: globalState.auth.user?.customerPhone,
            customerId: globalState.auth.user?.customerId,
        }
    })
    React.useEffect(() => {
        setData({
            customerLastName: globalState.auth.user?.customerFirstName as string,
            customerFirstName: globalState.auth.user?.customerLastName as string,
            customerPhone: globalState.auth.user?.customerPhone as string,
            customerId: globalState.auth.user?.customerId as string,
        })
    }, [globalState])

    const handleUpdateCustomer = async function () {
        try {
            // "customerId": 1502,
            // "customerLastName": "Nguyễn Quang",
            // "customerFirstName": "Gia Thuận",
            // "customerPhone": "0972301854",
            // "customerEmail": "giathuannguyen213@gmail.com",
            // "password": "giathuna123new123"
            let updateData = {
                "customerId": globalState.auth.user?.customerId as string,
                "customerLastName": globalState.auth.user?.customerFirstName as string,
                "customerFirstName": globalState.auth.user?.customerLastName as string,
                "customerPhone": globalState.auth.user?.customerPhone as string,
            }
            let result = await updateCustomer(data)
            if (result) {
                console.log(result)
                dispatch(_addUserToStore(result))
                push(`${linkRouting.account}`)
            }
        } catch (error) {

        }
    }

    const handleInput = function (key: string, value: any) {
        setData({
            ...data,
            [key]: value
        })
    }
    console.log(
        data
    )
    return (
        <MainLayout>
            <AccountLayouts>
                <InputComp value={data?.customerFirstName} onChangeCallBack={(e) => {
                    handleInput("customerFirstName", e.target.value)
                }} leftText={"First Name"} />

                <InputComp
                    value={data?.customerLastName}
                    onChangeCallBack={(e) => {
                        handleInput("customerLastName", e.target.value)
                    }} leftText={"Last Name"} />


                <InputComp value={data?.customerPhone} onChangeCallBack={(e) => {
                    handleInput("customerPhone", e.target.value)
                }} leftText={"Phone Number"} />
                <div className='flex justify-end'>
                    <div onClick={handleUpdateCustomer} className='hover:cursor-pointer'>
                        <h3 className='font-medium text-lg capitalize text-white bg-blue-500 px-3 py-1'>
                            save
                        </h3>
                    </div>

                </div>
            </AccountLayouts>
        </MainLayout>
    )
}

export default Editinfo