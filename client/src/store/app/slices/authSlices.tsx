import { createSlice } from "@reduxjs/toolkit";

export interface UserStoreInf {
    customerEmail?: string
    customerFirstName: string
    customerId: string
    customerLastName: string
    customerPhone: string
    enableStatus?: boolean
    expirationDate?: string
    // password: string
    token?: string
    verificationTokenCustomerid?: number
}


interface initiInf {
    user: null | UserStoreInf
}

export interface authSliceInf {
    user: UserStoreInf
}



export const authSlice = createSlice({
    name: "auth",
    initialState: () => {

        let stateInit: initiInf = {
            user: null
        }
        return stateInit
    },
    reducers: {


        _addUserToStore: (state, action) => {
            let payload: UserStoreInf = action.payload
            localStorage.setItem("user", JSON.stringify(payload))
            state.user = payload

        },
        _removeUserFromStore: (state) => {
            localStorage.removeItem("user")
            state.user = null
        }




    }
})



export const {
    _addUserToStore,
    _removeUserFromStore
} = authSlice.actions


export default authSlice.reducer