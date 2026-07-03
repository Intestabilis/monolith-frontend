import { Link } from "react-router";
import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import type { CampaignCardProps } from "./propsInterfaces";
import { getCloudinaryThumb } from "../../../utils/getCloudinaryThumb";

function CampaignVerticalCard({
  campaign,
  showRole = true,
}: CampaignCardProps) {
  const { id, title, masterUsername, imageUrl } = campaign.data;
  const { userRole } = campaign.meta;
  const optimizedImageUrl = getCloudinaryThumb(imageUrl, 128, 128);
  return (
    <Card
      variant="interactive"
      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4"
    >
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="h-16 w-16 shrink-0 overflow-hidden border border-border-muted bg-background">
          <img
            src={optimizedImageUrl}
            alt={title}
            className="h-full w-full object-cover grayscale contrast-125 transition-all group-hover:grayscale-0"
          />
        </div>

        <div className="flex flex-col truncate">
          <h3 className="font-heading uppercase text-xl tracking-wide text-text-primary line-clamp-1 group-hover:text-text-selected">
            {title}
          </h3>
          <p className="mt-1 font-mono text-xs text-text-muted">
            Майстер: <span className="text-text-primary">{masterUsername}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0 mt-4 sm:mt-0">
        {showRole && (
          <Badge variant={userRole}>
            {userRole === "master" ? "Master" : "Player"}
          </Badge>
        )}
        <Link
          to={`/campaigns/${id}`}
          className="border-2 border-border-strong bg-background px-6 py-2 text-center font-heading font-bold text-xs uppercase tracking-wider text-text-primary transition-all hover:border-border-default hover:bg-background-contrast hover:text-text-selected"
        >
          До кампейну →
        </Link>
      </div>
    </Card>
  );
}

export default CampaignVerticalCard;
