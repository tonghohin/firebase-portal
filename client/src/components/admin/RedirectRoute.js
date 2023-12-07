import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContextProvider";

// Redirect authenticated users to main portal when they try to visit login/riegister page
function RedirectRoute() {
    const admin = useAuth();
    return admin.uid && admin.isAdmin ? <Navigate to={`/admin/${admin.uid}`} replace /> : <Outlet />;
}

export default RedirectRoute;
