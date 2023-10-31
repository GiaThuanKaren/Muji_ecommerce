import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as IconSolid from "@fortawesome/free-solid-svg-icons"
import * as IconRegular from "@fortawesome/free-regular-svg-icons"
import { ToastContainer, toast } from 'react-toastify';

export {
    FontAwesomeIcon as ICON,
    IconRegular,
    IconSolid,
}


export const ResponeMSG = function (message: string, data: any[], status?: string) {
    return {
        message,
        data,
        status
    }

}

export const ShowToast = function (message: string, type: "ERROR" | "INFO" | " WARNING") {
    switch (type) {
        case "ERROR": {
            toast.error(message)
            break
        }
        case " WARNING": {
            toast.warning(message)
            break
        }
        case "INFO": {
            toast.info(message)
            break
        }
    }
}