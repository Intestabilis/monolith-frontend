import type { PropsWithChildren } from "react";
import { cn } from "../utils/cn";

interface CampaignPagesContainerProps {
  className?: string;
}

function CampaignPagesContainer({
  className,
  children,
}: PropsWithChildren<CampaignPagesContainerProps>) {
  return (
    // CHANGE move that type of scrollbar in custom tailwind utility later and maybe see if can do that effect with tailwind classes (like in custom-scrollbar)
    <div
      className={cn(
        "h-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border-muted",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl p-8">{children}</div>
    </div>
  );
}

export default CampaignPagesContainer;
