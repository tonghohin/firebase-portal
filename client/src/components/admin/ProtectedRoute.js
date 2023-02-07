import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Redirect unauthenticated users to login page when they try to visit the main portal
function ProtectedRoute() {
  const adminReducer = useSelector((store) => store.admin);

  return adminReducer.uid && adminReducer.isAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
}

export default ProtectedRoute;
