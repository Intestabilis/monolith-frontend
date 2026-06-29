import { NavLink } from "react-router";
import { cn } from "../utils/cn";
import type { PropsWithChildren, ReactNode } from "react";

interface SidebarItemProps {
  to: string;
  icon: ReactNode;
  end?: boolean;
  isCollapsed: boolean;
}

function SidebarItem({
  to,
  icon,
  children,
  end = false,
  isCollapsed,
}: PropsWithChildren<SidebarItemProps>) {
  return (
    <NavLink
      to={to}
      // REVIEW using of end prop
      end={end}
      className={({ isActive }) =>
        cn(
          "group flex items-center border-y-2 border-transparent py-4 transition-all duration-300 overflow-hidden",
          isCollapsed
            ? "justify-center px-0 mx-2"
            : "px-6 gap-4 border-l-4 border-l-transparent",
          isActive
            ? "bg-background-selected border-y-border-strong text-text-selected shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] " +
                (!isCollapsed ? "border-l-primary" : "border-l-0")
            : "text-text-muted hover:bg-surface-hover hover:text-text-primary",
        )
      }
    >
      <div
        className={cn(
          "h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-110",
          isCollapsed ? "text-text-muted group-hover:text-text-primary" : "",
        )}
      >
        {icon}
      </div>

      <span
        className={cn(
          "font-gothic-title text-lg mt-1 tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
          isCollapsed ? "max-w-0 opacity-0" : "max-w-50 opacity-100",
        )}
      >
        {children}
      </span>
    </NavLink>
  );
}

export default SidebarItem;
