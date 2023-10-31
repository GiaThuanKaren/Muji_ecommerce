import { useRouter } from "next/router";
import { routingLink } from "src/utils/routingLink";


const Logout: React.FC = () =>  {
    const { push } = useRouter()
    
    localStorage.removeItem("roleId")

    push(routingLink.login)

    return (<></>)
}

export default Logout;