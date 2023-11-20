import axios from "axios";
import { LoginModel, ResponeModel } from "src/Model/apiModel"
import { ShowToast } from "src/utils";
import useAuth from "src/utils/useAuth";

const BASE_DEV: string = 'http://localhost:8080'

export const LoginEmployee = async function (loginModel: LoginModel) {

    try {
        let { data } = await axios.post(`${BASE_DEV}/employee/login`, loginModel)

        return data
    } catch (error) {
        ShowToast("Failed To Login ", "ERROR")
    }

}

export const FetchAllCustomer = async function (currentPage?: number, limit?: number) {
    try {
        const params = {
            _page: currentPage,
            _limit: limit
        }
        let { data } = await axios.get<ResponeModel<EmployeeResponeModel>>(`${BASE_DEV}/customer/get_all`, { params } )
        return data
    } catch (error) {
        ShowToast("Failed To Get All Customer ", "ERROR")
    }
}
