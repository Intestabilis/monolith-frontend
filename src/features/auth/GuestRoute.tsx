import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./hooks/useAuth";
import Loader from "../../components/ui/Loader";

function GuestRoute() {
  const { user, isPending } = useAuth();

  // redirecting to previous url if it exists
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  if (isPending)
    return <Loader variant="d20" size="fullscreen" text="Завантаження..." />;

  if (user) return <Navigate to={from} replace />;
  return <Outlet />;
}

export default GuestRoute;
