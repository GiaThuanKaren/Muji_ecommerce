import axios from "axios";
const BASE_DEV: string = 'http://localhost:8080'


export const VerifyAccountByToken = async function (token: string) {
    interface VerifyTokenINf {
        status: string
        message: "Done" | "Token Expired" | "Invalid Token"
        data: any
    }
    try {
        console.log(`${BASE_DEV}/customer/verify_token?token=${token}`)
        let { data } = await axios.get<VerifyTokenINf>(`${BASE_DEV}/customer/verify_token?token=${token}`)
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

