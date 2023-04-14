import { Navigate, Outlet, useLocation } from "react-router-dom";


function PrivateRoute() {
  const auth = localStorage.getItem("username");
  const location = useLocation();
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;
