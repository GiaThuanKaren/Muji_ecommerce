import axios from "axios";
import { BASE_DEV } from ".";
import { ShowToast } from "src/utils";
import { ResponeModel, PermissionModel, PermissionResponeModel } from "src/Model/apiModel";

export const FetchAllPermission = async function () {
    try {
        let { data } = await axios.get<ResponeModel<PermissionModel>>(`${BASE_DEV}/permission/fetchAll`)
        return data
    } catch (error) {
        ShowToast("Failed To Get All Permission ", "ERROR")
    }
}

export const FindPermissionByRole = async function (roleId: number) {
    try {
        let { data } = await axios.post(`${BASE_DEV}/permission/findPermissionByRole`, {
            roleId: roleId
        }, { headers: {
            'Content-Type': 'application/json'
        } })
        console.log(data);
        
        return data
    } catch (error) {
        ShowToast("Failed To Find Permission By Role ", "ERROR")
    }
}

export const UpdatePermissionById = async function (func: PermissionModel) {
    // try {
    //     await axios.put(`${BASE_DEV}/customer/update_customerbyid`, role)
    //     ShowToast("Updated This Customer Successfully", "INFO")
    // } catch (error) {
    //     ShowToast("Failed to update this customer ", "ERROR")
    // }
}



export const DeletePermissionById = async function (id: number) {
    // try {
    //     await axios.delete(`${BASE_DEV}/customer/delete_customer_byid?id=${id}`)
    //     ShowToast("Deleted Successfully", "INFO")
    // } catch (error) {
    //     ShowToast("Failed to delete this customer", "ERROR")
    // }
}