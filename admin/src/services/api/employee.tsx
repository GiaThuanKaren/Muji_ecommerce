import axios from "axios";
import { LoginModel } from "src/Model/apiModel"
import { ShowToast } from "src/utils";

const BASE_DEV: string = 'http://localhost:8080'

export const LoginEmployee = async function (loginModel: LoginModel) {

    try {
        let { data } = await axios.post(`${BASE_DEV}/employee/login`, loginModel)
        switch (data.message) {
            case "Can not find user accout": {
                ShowToast("Can not find user accout", "INFO")
                return false
            }

            case "Authenticated": {
                localStorage.setItem("roleId", JSON.stringify(data.data.roleid.roleId))
                return true
            }

            default: {
                return false
            }
        }

        return true
    } catch (error) {
        ShowToast("Failed To Login ", "ERROR")
    }

}
