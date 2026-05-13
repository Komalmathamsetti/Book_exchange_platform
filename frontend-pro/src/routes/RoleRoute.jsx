import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
function RoleRoute({ children, role, }){
    const user = useAuth();
    if(!user || user.role != role){
       return <Navigate to="/" />;
    }
    return children;
}
export default RoleRoute;