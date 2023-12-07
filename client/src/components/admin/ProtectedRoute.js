import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContextProvider";

// Redirect unauthenticated users to login page when they try to visit the main portal
function ProtectedRoute() {
    const admin = useAuth();
    return admin.uid && admin.isAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
}

export default ProtectedRoute;
