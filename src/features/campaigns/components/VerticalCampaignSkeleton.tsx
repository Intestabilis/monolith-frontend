import Card from "../../../components/ui/Card";
import Skeleton from "../../../components/ui/Skeleton";

function VerticalCampaignSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {[1, 2, 3].map((n) => (
        <Card
          key={n}
          variant="interactive"
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 w-full"
        >
          <div className="flex items-center gap-4 w-full overflow-hidden">
            <Skeleton className="h-16 w-16 shrink-0 border border-border-muted" />

            <div className="flex flex-col gap-2 w-full max-w-62.5">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 mt-4 sm:mt-0">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-10 w-32" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default VerticalCampaignSkeleton;
