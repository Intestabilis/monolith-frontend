import { Navigate, Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";

function GuestRoute() {
  const { user, isPending } = useAuth();

  // REVIEW maybe loader
  if (isPending) return null;

  // CHANGE to user /home or smth
  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default GuestRoute;
