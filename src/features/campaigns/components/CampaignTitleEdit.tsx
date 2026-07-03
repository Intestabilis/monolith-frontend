import { useState, type KeyboardEvent } from "react";
import { useUpdateCampaign } from "../hooks/useUpdateCampaign";
import { UpdateCampaignSchema } from "../../../schemas/campaign.schema";
import Tooltip from "../../../components/ui/Tooltip";
import { cn } from "../../../utils/cn";

interface CampaignTitleEditProps {
  campaignId: string;
  initialTitle: string;
  isMaster: boolean;
}

function CampaignTitleEdit({
  campaignId,
  initialTitle,
  isMaster,
}: CampaignTitleEditProps) {
  const { updateCampaign, isPending } = useUpdateCampaign();
  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(initialTitle);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    const trimmedTitle = titleValue.trim();

    if (trimmedTitle === initialTitle) {
      setIsEditing(false);
      setError(null);
      return;
    }

    // Manual validation
    const validationResult = UpdateCampaignSchema.pick({
      title: true,
    }).safeParse({ title: trimmedTitle });

    if (!validationResult.success) {
      setError(validationResult.error.issues[0].message);
      return;
    }

    setError(null);
    updateCampaign(
      { id: campaignId, data: { title: trimmedTitle } },
      {
        onSuccess: () => setIsEditing(false),
        onError: (err) => setError(err.message),
      },
    );
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") handleSubmit();
    if (event.key === "Escape") {
      setTitleValue(initialTitle);
      setError(null);
      setIsEditing(false);
    }
  }

  if (isEditing && isMaster) {
    return (
      <div className="w-full max-w-3xl">
        <input
          autoFocus
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          disabled={isPending}
          className={cn(
            "w-full bg-surface/50 border-b-2 border-dashed pb-1 font-gothic-title text-4xl sm:text-5xl text-text-selected focus:outline-none",
            error ? "border-danger text-danger" : "border-primary",
          )}
        />
        {error && <p className="font-mono text-xs text-danger mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <Tooltip
      content={isMaster ? "Натисніть, щоб змінити назву" : null}
      side="top"
    >
      <h1
        onClick={() => isMaster && setIsEditing(true)}
        className={cn(
          "font-gothic-title text-4xl sm:text-5xl text-text-selected pb-1 border-b-2 border-transparent transition-all inline-block",
          isMaster &&
            "cursor-pointer hover:border-border-muted hover:text-primary",
        )}
      >
        {initialTitle}
      </h1>
    </Tooltip>
  );
}

export default CampaignTitleEdit;
