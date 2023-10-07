import axios from "axios";
import { CategoriesModel, LoginModel, Product, ProductLineModel, ProductModel, RegisterModel, ResponeModel } from "src/Model";
import { ShowToast } from "src/utils/constant";
const BASE_DEV: string = 'http://localhost:8080'


export const VerifyAccountByToken = async function (token: string) {
    interface VerifyTokenINf {
        status: string
        message: "Done" | "Token Expired" | "Invalid Token"
        data: any
    }
    try {
        console.log(`${BASE_DEV}/customer/verify_token?token=${token}`)
        let { data } = await axios.get<VerifyTokenINf>(`${BASE_DEV}/customer/verify_token?token=${token}`)
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}



export const FetchAllCategories = async function () {
    try {
        let { data } = await axios.get<ResponeModel<CategoriesModel>>(`${BASE_DEV}/categories/fetchAll`)
        return data.data
    } catch (error) {
        throw error
    }
}


export const FetchAllProductLine = async function () {
    try {
        let { data } = await axios.get<ResponeModel<ProductLineModel>>(`${BASE_DEV}/productline/fetch_all`)
        return data.data
    } catch (error) {
        throw error
    }
}


export const GetAllProductByIdCategories = async function (idCategories: number) {
    try {
        let { data } = await axios.get<ResponeModel<ProductModel>>(`${BASE_DEV}/product/getbyidcategories?idcategories=${idCategories}`)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}


export const GetDetailProductById = async function (productId: string) {
    try {
        interface ResponeModel1<T> {
            status: string,
            message: string,
            data: T
        }
        let { data } = await axios.get<ResponeModel1<ProductModel>>(`${BASE_DEV}/product/getproductbyid?productid=${productId}`)
        return data
    } catch (error) {
        console.log(error)
    }
}






export const NewUserRegister = async function (registerModel: RegisterModel) {
    try {
        let { data } = await axios.post(`${BASE_DEV}/register`, registerModel)

        return data
    } catch (error) {
        ShowToast("Failed To Register ", "ERROR")
    }
}

export const LoginCustomer = async function (loginModel: LoginModel) {
    try {
        let { data } = await axios.post(`${BASE_DEV}/customer/login`, loginModel)
        switch (data.message) {
            case "Can not find user accout": {
                ShowToast("Can not find user accout", "INFO")
                return false
            }
            case "Please Verify Your Email": {
                ShowToast("Please Verify Your Email", "INFO")
                return false
            }
            case "Authenticated": {
                return true
            }
        }

        return true
    } catch (error) {
        ShowToast("Failed To Login ", "ERROR")
    }
}


export const sendEmailResetPassword = async function (customerEmail: string) {
    try {
        let { data } = await axios.post(`${BASE_DEV}/customer/sendEmailResetPassword`, {
            customerEmail: customerEmail
        })
        switch (data.message) {
            case "Can not find any account with this email": {
                ShowToast("Can not find any account with this email", "INFO")

                return false
            }
            case "Done": {
                ShowToast("Check Your Inbox", "INFO")
                return true
            }
        }
    } catch (error) {
        ShowToast("Failed To Send Email , PLease Try Again", "ERROR")
    }
}