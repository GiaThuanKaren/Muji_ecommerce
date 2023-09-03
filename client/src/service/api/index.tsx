import axios from "axios";
import { CategoriesModel, Product, ProductLineModel, ProductModel, ResponeModel } from "src/Model";
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