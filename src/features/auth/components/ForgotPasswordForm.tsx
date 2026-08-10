import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AuthMode } from "../../../pages/AuthPage";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { useForgotPassword } from "../hooks/useForgotPassword";
import FormInput from "../../../components/FormInput";
import {
  ForgotPasswordSchema,
  type ForgotPasswordDTO,
} from "../../../schemas/user.schema";

interface ForgotPasswordFormProps {
  onToggle: (mode: AuthMode) => void;
}

function ForgotPasswordForm({ onToggle }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordDTO>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const { forgotPassword, isPending, isSuccess } = useForgotPassword();

  function onSubmit(data: ForgotPasswordDTO) {
    forgotPassword(data.email);
  }

  return (
    <Card variant="default" className="w-full">
      <h2 className="mb-6 border-b-2 border-border-strong pb-4 font-gothic-title text-2xl text-text-selected text-center">
        Відновлення доступу
      </h2>

      {isSuccess ? (
        <div className="space-y-6 text-center">
          <p className="font-mono text-sm text-success">
            Інструкція для зміни пароля була надіслана на вказану пошту.
          </p>
          <Button
            type="button"
            variant="default"
            className="w-full"
            onClick={() => onToggle("login")}
          >
            Повернутися до входу
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Електронна пошта"
            placeholder="john@dnd.com"
            type="email"
            disabled={isPending}
            error={errors.email?.message}
            {...register("email")}
          />

          <Button
            type="submit"
            variant="primary"
            disabled={isPending}
            className="mt-4 w-full"
          >
            {isPending ? "Відправка..." : "Надіслати інструкції"}
          </Button>
        </form>
      )}

      {!isSuccess && (
        <div className="mt-6 text-center font-mono text-xs text-text-muted">
          <button
            type="button"
            onClick={() => onToggle("login")}
            className="font-bold text-text-primary underline decoration-text-muted transition-all hover:text-text-selected hover:decoration-text-selected focus:outline-none"
          >
            Повернутися до входу
          </button>
        </div>
      )}
    </Card>
  );
}

export default ForgotPasswordForm;
