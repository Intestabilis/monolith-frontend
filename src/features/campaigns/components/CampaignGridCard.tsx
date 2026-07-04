import { Link } from "react-router";
import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import type { CampaignCardProps } from "./propsInterfaces";
import { getCloudinaryThumb } from "../../../utils/getCloudinaryThumb";

function CampaignGridCard({ campaign, showRole = true }: CampaignCardProps) {
  const { id, title, masterUsername, imageUrl } = campaign.data;
  const { userRole } = campaign.meta;
  const optimizedImageUrl = getCloudinaryThumb(imageUrl);
  return (
    <Card variant="interactive">
      <div className="relative mb-4 h-40 w-full overflow-hidden border border-border-muted bg-background">
        <img
          src={optimizedImageUrl}
          alt={title}
          className="h-full w-full object-cover grayscale contrast-125 transition-all group-hover:grayscale-0"
        />
        {showRole ? (
          <Badge
            variant={userRole}
            className="absolute top-2 right-2 shadow-sm"
          >
            {/* REVIEW should add type of user roles and use it there if I'll implement other roles in the future*/}
            {userRole === "master" ? "Master" : "Player"}
          </Badge>
        ) : null}
      </div>

      <div>
        <h3 className="font-heading uppercase text-xl tracking-wide text-text-primary line-clamp-1 group-hover:text-text-selected">
          {title}
        </h3>
        <p className="mt-1 font-mono text-sm text-text-muted">
          Майстер: <span className="text-text-primary">{masterUsername}</span>
        </p>
      </div>

      <Link
        to={`/campaigns/${id}`}
        className="mt-4 block w-full border-2 border-border-strong bg-background py-2 text-center font-heading font-bold text-sm uppercase tracking-wider text-text-primary transition-all hover:border-border-default hover:bg-background-contrast hover:text-text-selected"
      >
        Перейти до кампейну →
      </Link>
    </Card>
  );
}

export default CampaignGridCard;
