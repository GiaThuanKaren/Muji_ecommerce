import axios from "axios"
import { ProductLineModel, ProductLineResponeModel, ResponeModel } from "src/Model/apiModel"
import { BASE_DEV } from "."
import { ShowToast } from "src/utils"

export const FetchAll = async function () {
    try {
        let { data } = await axios.get<ResponeModel<ProductLineResponeModel>>(`${BASE_DEV}/productline/fetch_all`)
        return data
    } catch (error) {
        ShowToast("Error to fetch all product line", "ERROR")
    }
}

export const UpdateId = async function (productLineModel: ProductLineModel) {
    try {
        let { data } = await axios.put(`${BASE_DEV}/productline/edit`, productLineModel)
        ShowToast("Update Sucessfully", "INFO")
    } catch (error) {
        ShowToast("Failed to update", "ERROR")
    }
}

export const CreateNewProductLine = async function (productLineModel: ProductLineModel) {
    try {
        let { data } = await axios.post(`${BASE_DEV}/productline/create_new`, productLineModel)
        ShowToast("Sucessfully", "INFO")
    } catch (error) {
        ShowToast("Failed To Create", "ERROR")
    }
}

export const deleteProductLine = async function (id: number) {
    try {
        await axios.delete(`${BASE_DEV}/productline/delete/${id}`)
        ShowToast("Sucessfully", "INFO")

    } catch (error) {
        ShowToast("Failed To Create", "ERROR")

    }
}