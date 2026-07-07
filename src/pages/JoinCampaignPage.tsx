import { useNavigate, useParams } from "react-router";
import { useJoinCampaign } from "../features/party/hooks/useJoinCampaign";
import { useEffect } from "react";
import Card from "../components/ui/Card";
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";

function JoinCampaignPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const { joinCampaign, error } = useJoinCampaign();

  // to trigger join automatically on page mounting
  useEffect(() => {
    if (token) {
      joinCampaign(token);
    }
  }, [token, joinCampaign]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-background p-4">
        <Card
          variant="default"
          className="w-full max-w-md flex flex-col items-center text-center"
        >
          {/* CHANGE to icon */}
          <span className="text-6xl mb-4">X</span>
          <h1 className="mb-6 font-osr-title text-2xl text-text-selected">
            Не вдалося приєднатися до цього кампейну
          </h1>
          <Alert variant="error" className="w-full text-center mb-6">
            {error.message}
          </Alert>
          <Button
            variant="default"
            className="w-full"
            onClick={() => navigate("/", { replace: true })}
          >
            На головну сторінку
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center gap-6 animate-pulse">
        {/* CHANGE to icon */}
        <span className="text-5xl text-primary">LOAD</span>
        <p className="font-mono text-lg uppercase tracking-widest text-text-selected">
          Приєднання до кампейну...
        </p>
      </div>
    </div>
  );
}

export default JoinCampaignPage;
