import React from 'react'
import { InputComp } from 'src/Components'
import { AccountLayouts, MainLayout } from 'src/Layouts'

function Editinfo() {
    return (
        <MainLayout>
            <AccountLayouts>
                <InputComp onChangeCallBack={() => {

                }} leftText={"First Name"} />

                <InputComp onChangeCallBack={() => {

                }} leftText={"Last Name"} />


                <InputComp onChangeCallBack={() => {

                }} leftText={"Phone Number"} />
            </AccountLayouts>
        </MainLayout>
    )
}

export default Editinfo