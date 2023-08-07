import axios from "axios";
import { ProductModel, ProductResponeModel, ResponeModel } from "src/Model/apiModel";
import { BASE_DEV, BASE_PRO } from ".";
import { ShowToast } from "src/utils";



export const FetchAllProduct = async function () {
    try {
        let { data } = await axios.get<ResponeModel<ProductResponeModel>>(`${BASE_DEV}/product/fetchAll`)
        return data
    } catch (error) {

    }
}

export const CreateNewProduct = async function (productModel: ProductModel) {
    try {
        let { data } = await axios.post<ResponeModel<ProductResponeModel>>(`${BASE_DEV}/product/create_new`, productModel)
        console.log(data)
        ShowToast("Created New Product Sucessfully", "INFO")
    } catch (error) {
        ShowToast("Failed To Create New Product", "ERROR")
    }

}

export const UpdateProductId = async function (productModel: ProductResponeModel) {
    try {

        let { data } = await axios.put(`${BASE_DEV}/product/updateProductByID`, productModel)
        console.log(data)
        ShowToast("Updated Product Sucessfully", "INFO")
    } catch (error) {
        console.log(error)
        ShowToast("Failed To Update  Product", "ERROR")
    }
}

export const DeleteProductById = async function (id: number) {
    try {

    } catch (error) {

    }
}