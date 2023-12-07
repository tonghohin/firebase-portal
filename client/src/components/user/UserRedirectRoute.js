import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContextProvider";

// Redirect authenticated users to main portal when they try to visit login/register page
function UserRedirectRoute() {
    const user = useAuth();
    return user.uid && !user.isAdmin ? <Navigate to={`/${user.unit}`} replace /> : <Outlet />;
}

export default UserRedirectRoute;
