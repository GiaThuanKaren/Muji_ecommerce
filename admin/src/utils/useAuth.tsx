import { useContext } from "react";
import { AuthContext } from "src/Context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;