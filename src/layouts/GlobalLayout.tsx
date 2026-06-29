import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function GlobalLayout() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default GlobalLayout;
