import Card from "../../../components/ui/Card";
import Skeleton from "../../../components/ui/Skeleton";

function GridCampaignSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[1, 2].map((n) => (
        <Card key={n} variant="interactive" className="h-80">
          <Skeleton className="h-40 mb-4 border border-border-muted" />
          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="mt-4 h-10 w-full" />
        </Card>
      ))}
    </div>
  );
}

export default GridCampaignSkeleton;
