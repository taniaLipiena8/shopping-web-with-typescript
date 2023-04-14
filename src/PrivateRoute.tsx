import { Navigate, Outlet } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute() {
  const auth = localStorage.getItem("username");

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login"  replace />
  );
}

export default PrivateRoute;
