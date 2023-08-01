import axios from "axios";
import { ProductModel, ProductResponeModel, ResponeModel } from "src/Model/apiModel";
import { BASE_DEV } from ".";
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

export const UpdateProductId = async function (productModel: ProductModel) {
    try {

    } catch (error) {

    }
}

export const DeleteProductById = async function (id: number) {
    try {

    } catch (error) {

    }
}