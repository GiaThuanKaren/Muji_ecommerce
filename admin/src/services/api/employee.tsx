import axios from "axios";
import { LoginModel } from "src/Model/apiModel"
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
