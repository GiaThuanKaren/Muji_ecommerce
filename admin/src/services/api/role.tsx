import axios from "axios";
import { BASE_DEV } from ".";
import { ShowToast } from "src/utils";
import { RoleModel, ResponeModel } from "src/Model/apiModel";

export const FetchAllRole = async function () {
    try {
        let { data } = await axios.get<ResponeModel<RoleModel>>(`${BASE_DEV}/role/fetchAll`)
        return data
    } catch (error) {
        ShowToast("Failed To Get All Role ", "ERROR")
    }
}

export const UpdateRoleById = async function (role: RoleModel) {
    // try {
    //     await axios.put(`${BASE_DEV}/customer/update_customerbyid`, role)
    //     ShowToast("Updated This Customer Successfully", "INFO")
    // } catch (error) {
    //     ShowToast("Failed to update this customer ", "ERROR")
    // }
}



export const DeleteRoleById = async function (id: number) {
    // try {
    //     await axios.delete(`${BASE_DEV}/customer/delete_customer_byid?id=${id}`)
    //     ShowToast("Deleted Successfully", "INFO")
    // } catch (error) {
    //     ShowToast("Failed to delete this customer", "ERROR")
    // }
}