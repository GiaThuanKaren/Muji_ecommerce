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

export const CreatePermission = async function (per: PermissionModel) {
    try {
        await axios.post(`${BASE_DEV}/permission/create_new`, { roleId: per.permission.roleId, functionId: per.permission.functionId })
        ShowToast("Created This Permission Successfully", "INFO")
    } catch (error) {
        ShowToast("Failed to create this permission ", "ERROR")
    }
}

export const UpdatePermissionById = async function (per: PermissionModel) {
    try {
        await axios.put(`${BASE_DEV}/permission/updatePermissionByID`, { funnctionId: per.permission.functionId })
        ShowToast("Updated This Permission Successfully", "INFO")
    } catch (error) {
        ShowToast("Failed to update this permission ", "ERROR")
    }
}



export const DeletePermissionById = async function (roleId: number, funcId: number) {
    const params = {
        roleId,
        funcId
    }
    try {
        await axios.delete(`${BASE_DEV}/permission/deletePermission`, { params })
        ShowToast("Deleted Successfully", "INFO")
    } catch (error) {
        ShowToast("Failed to Delete this Function", "ERROR")
    }
}