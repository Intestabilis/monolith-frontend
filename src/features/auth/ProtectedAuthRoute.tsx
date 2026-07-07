import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./hooks/useAuth";

function ProtectedAuthRoute() {
  const { user, isPending } = useAuth();
  const location = useLocation();
  // CHANGE to loader
  if (isPending) return <div>TESSST</div>;

  if (!user)
    return <Navigate to="/auth" state={{ from: location }} replace></Navigate>;

  return <Outlet />;
}

export default ProtectedAuthRoute;
