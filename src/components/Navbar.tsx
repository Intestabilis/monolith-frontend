import { Link, NavLink } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useProfile } from "../features/user/hooks/useProfile";
import { cn } from "../utils/cn";
import Badge from "./ui/Badge";
import { buttonVariants } from "./ui/Button";
import LogoutButton from "../features/auth/components/LogoutButton";

function Navbar() {
  const { isPending } = useAuth();

  const { user: profile, isPending: isPendingInfo } = useProfile();

  return (
    <nav className="sticky top-0 z-50 w-full grid grid-cols-[1fr_auto_1fr] items-center border-border-strong bg-surface px-8 py-4 shadow-sm">
      <div className="flex items-center gap-2 justify-start">
        <Link to="/">
          <span className="font-gothic-title text-2xl tracking-wide text-text-selected">
            MONOLITH
          </span>
        </Link>
        <Badge variant="default" className="hidden sm:inline-flex">
          BETA
        </Badge>
      </div>

      <div className="hidden items-center gap-6 font-heading text-sm font-bold uppercase tracking-wider text-text-muted md:flex">
        {/* <NavLink
          to="/about"
          className={({ isActive }) =>
            cn(
              "hover:text-text-primary transition-colors",
              isActive && "text-text-selected",
            )
          }
        >
          Something
        </NavLink>
        <NavLink
          to="/welcome"
          className={({ isActive }) =>
            cn(
              "hover:text-text-primary transition-colors",
              isActive && "text-text-selected",
            )
          }
        >
          Dashboard
        </NavLink> */}
      </div>

      <div className="flex items-center gap-4 justify-end">
        {isPending ? (
          <div className="h-10 w-24 animate-pulse bg-muted"></div>
        ) : !isPendingInfo && profile ? (
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-text-primary hidden sm:block">
              {profile.username}
            </span>
            <NavLink
              to="/profile"
              className={buttonVariants({ variant: "ghost" })}
            >
              Профіль
            </NavLink>
            <LogoutButton loadingText="Вихід...">Вийти</LogoutButton>
          </div>
        ) : (
          <NavLink
            to="/auth"
            className={buttonVariants({ variant: "default" })}
          >
            Увійти
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
