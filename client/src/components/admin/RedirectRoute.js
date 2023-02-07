import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Redirect authenticated users to main portal when they try to visit login/riegister page
function RedirectRoute() {
  const adminReducer = useSelector((store) => store.admin);

  return adminReducer.uid && adminReducer.isAdmin ? <Navigate to={`/admin/${adminReducer.uid}`} replace /> : <Outlet />;
}

export default RedirectRoute;
