import axios from "axios";
import { BASE_DEV } from ".";
import { ShowToast } from "src/utils";
import { ResponeModel, FunctionModel } from "src/Model/apiModel";

export const FetchAllFunction = async function () {
    try {
        let { data } = await axios.get<ResponeModel<FunctionModel>>(`${BASE_DEV}/function/fetchAll`)
        return data
    } catch (error) {
        ShowToast("Failed To Get All Role ", "ERROR")
    }
}

export const UpdateFunctionById = async function (func: FunctionModel) {
    // try {
    //     await axios.put(`${BASE_DEV}/customer/update_customerbyid`, role)
    //     ShowToast("Updated This Customer Successfully", "INFO")
    // } catch (error) {
    //     ShowToast("Failed to update this customer ", "ERROR")
    // }
}



export const DeleteFunctionById = async function (id: number) {
    // try {
    //     await axios.delete(`${BASE_DEV}/customer/delete_customer_byid?id=${id}`)
    //     ShowToast("Deleted Successfully", "INFO")
    // } catch (error) {
    //     ShowToast("Failed to delete this customer", "ERROR")
    // }
}