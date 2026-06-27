import { Navigate, Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";

function ProtectedAuthRoute() {
  const { user, isPending } = useAuth();

  // CHANGE to loader
  if (isPending) return <div>TESSST</div>;

  if (!user) return <Navigate to="/login" replace></Navigate>;

  return <Outlet />;
}

export default ProtectedAuthRoute;
