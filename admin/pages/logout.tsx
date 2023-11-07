import { useRouter } from "next/router";
import { routingLink } from "src/utils/routingLink";
import useAuth from "src/utils/useAuth";


const Logout: React.FC = () =>  {
    const { setAuth } = useAuth()
    const { push } = useRouter()
    
    setAuth({})

    push(routingLink.login)

    return (<></>)
}

export default Logout;