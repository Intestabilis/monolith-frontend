import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";

interface NoCampaignsStateProps {
  title: string;
  description: string;
  onCreateClick?: () => void;
}

function NoCampaignsState({
  title,
  description,
  onCreateClick,
}: NoCampaignsStateProps) {
  return (
    <Card variant="dashed" className="text-text-muted">
      <span className="text-3xl block mb-2 opacity-50 uppercase">x</span>
      <h4 className="text-lg font-bold font-heading text-text-primary">
        {title}
      </h4>
      <p className="mt-1 text-sm font-mono max-w-xs mx-auto">{description}</p>
      {onCreateClick && (
        <Button
          variant="primary"
          size="sm"
          className="mt-4"
          onClick={onCreateClick}
        >
          + Створити кампанію
        </Button>
      )}
    </Card>
  );
}

export default NoCampaignsState;
