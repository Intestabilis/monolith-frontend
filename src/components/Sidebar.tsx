import { Link } from "react-router";
import SidebarItem from "./SidebarItem";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useProfile } from "../features/user/useProfile";
import { useState } from "react";
import { cn } from "../utils/cn";
import Button from "./ui/Button";
import Separator from "./ui/Separator";
import Tooltip from "../components/ui/Tooltip";
import { ChevronRight, MoveLeft } from "lucide-react";
import FantasyIcon from "./icons/FantasyIcon";

function Sidebar({ campaignTitle }: { campaignTitle: string }) {
  const { user } = useAuth();
  const { user: profile } = useProfile(user?.id);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-surface border-l-4 border-border-strong transition-all duration-300 ease-in-out select-none overflow-x-hidden",
        isCollapsed ? "w-20" : "w-72",
      )}
    >
      {/* Header */}
      <div className="flex h-24 shrink-0 items-center bg-background-contrast border-b-4 border-border-strong px-4 transition-all duration-300">
        <div
          className={cn(
            "flex shrink-0 transition-all duration-300",
            isCollapsed ? "w-full justify-center" : "mr-3",
          )}
        >
          <Tooltip
            content={isCollapsed ? "Розгорнути меню" : "Згорнути меню"}
            side={isCollapsed ? "left" : "bottom"}
          >
            <Button
              variant="default"
              size="sm"
              className="h-8 w-8 p-0 border border-border-strong bg-surface hover:bg-background-selected shrink-0"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {/* idk we can just do a check and use ChevronLeft but it seems like more efficient? Not sure that one icon changes much but anyway */}
              <ChevronRight
                size="20"
                strokeWidth="2.5"
                className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
              />
            </Button>
          </Tooltip>
        </div>
        <div
          className={cn(
            "flex flex-col text-left font-heading overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out",
            isCollapsed ? "max-w-0 opacity-0" : "max-w-45 opacity-100",
          )}
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted mb-0.5">
            Поточний кампейн
          </span>
          <Tooltip side="bottom" content={campaignTitle}>
            <h2 className="font-gothic-title campaign-title-truncate text-primary drop-shadow-md">
              {campaignTitle}
            </h2>
          </Tooltip>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 flex flex-col">
        <SidebarItem
          to=""
          end
          isCollapsed={isCollapsed}
          icon={<FantasyIcon name="unfurledScroll" className="h-8 w-8" />}
        >
          Огляд
        </SidebarItem>
        <SidebarItem
          to="questboard"
          isCollapsed={isCollapsed}
          icon={<FantasyIcon name="hangingSign" className="h-8 w-8" />}
        >
          Квести
        </SidebarItem>
        <SidebarItem
          to="codex"
          isCollapsed={isCollapsed}
          icon={<FantasyIcon name="openBook" className="h-8 w-8" />}
        >
          Кодекс
        </SidebarItem>

        <SidebarItem
          to="party"
          isCollapsed={isCollapsed}
          icon={<FantasyIcon name="campfire" className="h-8 w-8" />}
        >
          Партія
        </SidebarItem>

        <Separator variant="dashed" className="my-2 mx-4 w-auto" />

        <SidebarItem
          to="dmscreen"
          isCollapsed={isCollapsed}
          icon={<FantasyIcon name="bookCover" className="h-8 w-8" />}
        >
          Ширма
        </SidebarItem>
      </nav>

      {/* Bottom part (username + return) */}
      <div className="shrink-0 flex flex-col justify-center border-t-4 border-border-strong bg-background p-3 h-24 transition-all duration-300">
        <div
          className={cn(
            "flex items-center mb-3 overflow-hidden whitespace-nowrap transition-all duration-300",
            isCollapsed ? "justify-center" : "px-2",
          )}
        >
          <svg
            className="h-5 w-5 shrink-0 text-text-muted"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>

          <div
            className={cn(
              "transition-all duration-300 ease-in-out",
              isCollapsed
                ? "max-w-0 opacity-0 ml-0"
                : "max-w-37.5 opacity-100 ml-3",
            )}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted w-[30ch] truncate">
              <span className="font-bold text-text-primary">
                {profile?.username}
              </span>
            </p>
          </div>
        </div>

        {/* REVIEW return path */}
        <Link to="/profile" className="block w-full">
          <Tooltip
            content="Повернутися до профілю"
            side={isCollapsed ? "left" : "top"}
          >
            <Button
              variant="default"
              size="sm"
              className={cn(
                "w-full border-2 border-border-strong bg-surface transition-colors hover:border-border-default hover:bg-background-contrast hover:text-text-selected",
                isCollapsed ? "px-0 justify-center h-10" : "gap-2 py-3 h-10",
              )}
            >
              <MoveLeft size="20" />
              <span
                className={cn(
                  "font-heading text-xs font-bold tracking-wider overflow-hidden whitespace-nowrap transition-all duration-300",
                  isCollapsed ? "max-w-0 opacity-0" : "max-w-25 opacity-100",
                )}
              >
                Повернутися
              </span>
            </Button>
          </Tooltip>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
