import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContextProvider";

// Redirect unauthenticated users to login page when they try to visit the main portal
function UserProtectedRoute() {
    const user = useAuth();
    return user.uid && !user.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}

export default UserProtectedRoute;
