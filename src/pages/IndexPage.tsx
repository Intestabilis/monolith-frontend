import { useAuth } from "../features/auth/hooks/useAuth";
import DashboardPage from "./DashboardPage";
import Loader from "../components/ui/Loader";
import AboutPage from "./AboutPage";

function IndexPage() {
  const { user, isPending } = useAuth();

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader size="fullscreen" variant="d20" text="Завантаження..." />
      </div>
    );
  }

  return user ? <DashboardPage /> : <AboutPage />;
}

export default IndexPage;
