import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./hooks/useAuth";

function GuestRoute() {
  const { user, isPending } = useAuth();

  // redirecting to previous url if it exists
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  // REVIEW maybe loader
  if (isPending) return null;

  // CHANGE to user /home or smth
  if (user) return <Navigate to={from} replace />;
  return <Outlet />;
}

export default GuestRoute;
