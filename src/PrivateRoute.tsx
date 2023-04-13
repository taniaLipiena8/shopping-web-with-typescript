import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = localStorage.getItem("username");

  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
}

export { PrivateRoute };
