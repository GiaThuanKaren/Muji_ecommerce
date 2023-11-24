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

    const [data, setData] = React.useState(() => {

        return {
            customer_id: globalState.auth.user?.customer_id,
            customer_last_name: globalState.auth.user?.customer_first_name,
            customer_first_name: globalState.auth.user?.customer_last_name,
            customer_phone: globalState.auth.user?.customer_phone,
        }
    })
    React.useEffect(() => {
        setData({
            customer_id: globalState.auth.user?.customer_id,
            customer_last_name: globalState.auth.user?.customer_first_name,
            customer_first_name: globalState.auth.user?.customer_last_name,
            customer_phone: globalState.auth.user?.customer_phone,
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
                "customerId": globalState.auth.user?.customer_id as string ,
                "customerLastName": globalState.auth.user?.customer_first_name as string ,
                "customerFirstName": globalState.auth.user?.customer_last_name as string ,
                "customerPhone": globalState.auth.user?.customer_phone as string ,
            }
            let result = await updateCustomer(dupdateDataata)
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
                <InputComp value={data?.customer_first_name} onChangeCallBack={(e) => {
                    handleInput("customer_first_name", e.target.value)
                }} leftText={"First Name"} />

                <InputComp
                    value={data?.customer_last_name}
                    onChangeCallBack={(e) => {
                        handleInput("customer_last_name", e.target.value)
                    }} leftText={"Last Name"} />


                <InputComp value={data?.customer_phone} onChangeCallBack={(e) => {
                    handleInput("customer_phone", e.target.value)
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