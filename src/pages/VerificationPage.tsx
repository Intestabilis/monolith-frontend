import { useSearchParams, useNavigate } from "react-router";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useActivateAccount } from "../features/auth/hooks/useActivateAccount";
import Alert from "../components/ui/Alert";
import { useAuth } from "../features/auth/hooks/useAuth";

function VerificationPage() {
  const [searchParams] = useSearchParams();
  const link = searchParams.get("link");
  const navigate = useNavigate();

  // REVIEW useAuth there - it shouldn't cause any errors, but doesn't look as a clearest solution to me
  const { user } = useAuth();
  const { activateAccount, isPending, isSuccess, error } = useActivateAccount(
    user?.id,
  );

  console.log(error);

  if (!link) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card variant="default" className="text-center">
          <h2 className="font-gothic-title text-2xl text-danger mb-4">
            Щось пішло не так...
          </h2>
          <p className="text-text-muted font-mono mb-6">
            Посилання для активації відсутнє або пошкоджене.
          </p>
          <Button onClick={() => navigate("/")}>
            Повернутися на головну сторінку
          </Button>
        </Card>
      </div>
    );
  }

  function handleActivate() {
    activateAccount(link!, {
      onSuccess: () => {
        setTimeout(() => navigate("/profile"), 1000);
      },
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card variant="default" className="text-center max-w-md w-full">
        <h2 className="font-gothic-title text-2xl text-text-selected mb-4 border-b-2 border-border-strong pb-4">
          Підтвердження реєстрації
        </h2>

        {isSuccess ? (
          <div className="space-y-4">
            <p className="text-success font-mono">Акаунт успішно активовано!</p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-text-muted font-mono">
              Підтвердіть реєстрацію акаунту, щоб отримати повний* доступ до
              функціоналу.
            </p>

            {error && (
              <Alert variant="error">
                {error?.message || "Не вдалося активувати акаунт"}
              </Alert>
            )}

            <Button
              variant="primary"
              className="w-full"
              onClick={handleActivate}
              disabled={isPending}
            >
              {isPending ? "Активація..." : "Активувати акаунт"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default VerificationPage;
