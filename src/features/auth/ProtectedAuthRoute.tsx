import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./hooks/useAuth";
import Loader from "../../components/ui/Loader";

function ProtectedAuthRoute() {
  const { user, isPending } = useAuth();
  const location = useLocation();

  if (isPending)
    return <Loader variant="d20" size="fullscreen" text="Завантаження..." />;

  if (!user)
    return <Navigate to="/auth" state={{ from: location }} replace></Navigate>;

  return <Outlet />;
}

export default ProtectedAuthRoute;
