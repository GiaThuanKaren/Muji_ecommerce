import axios from "axios";
import { BASE_DEV } from ".";
import { ShowToast } from "src/utils";
import { CustomerResponeModel, ResponeModel } from "src/Model/apiModel";

export const FetchAllCustomer = async function () {
    try {
        let { data } = await axios.get<ResponeModel<CustomerResponeModel>>(`${BASE_DEV}/customer/fetch_all`)
        return data
    } catch (error) {
        ShowToast("Failed To Get All Customer ", "ERROR")
    }
}

export const UpdateCustomerById = async function (customer: CustomerResponeModel) {
    try {
        await axios.put(`${BASE_DEV}/customer/update_customerbyid`, customer)
        ShowToast("Updated This Customer Successfully", "INFO")
    } catch (error) {
        ShowToast("Failed to update this customer ", "ERROR")
    }
}



export const DeleteCustomerById = async function (id: number) {
    try {
        await axios.delete(`${BASE_DEV}/customer/delete_customer_byid?id=${id}`)
        ShowToast("Deleted Successfully", "INFO")
    } catch (error) {
        ShowToast("Failed to delete this customer", "ERROR")
    }
}