import axios from "axios";
import { BASE_DEV } from ".";
import { ShowToast } from "src/utils";
import { ResponeModel, SkuValueModel, SkuValueResponeModel } from "src/Model/apiModel";

export const FetchAllSkuValue = async function () {
    try {
        let { data } = await axios.get<ResponeModel<SkuValueResponeModel>>(`${BASE_DEV}/skuvalue/fetchAll`)
        return data
    } catch (error) {
        ShowToast("Failed To Fetch All Sku Values", "ERROR")
    }
}


export const CreateNewSkuValue = async function (skuValueModel: SkuValueModel) {
    try {
        await axios.post(`${BASE_DEV}/skuvalue/create_new`, skuValueModel)
        ShowToast("Created Successfully", "INFO")
    } catch (error) {
        ShowToast("Failed To Create New Sku Value", "ERROR")
    }
}


export const DeleteSkuValue = async function (skuValueModel: SkuValueModel) {
    try {
        await axios.delete(`${BASE_DEV}`)
        ShowToast("Deleted Sucessfully","INFO")
    } catch (error) {
        ShowToast("Failed To Delete This Sku Value", "ERROR")
    }
}