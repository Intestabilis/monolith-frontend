import { useSearchParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import FormInput from "../components/FormInput";
import { useResetPassword } from "../features/auth/hooks/useResetPassword";
import {
  type ResetPasswordForm,
  resetPasswordSchema,
} from "../schemas/user.schema";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const { resetPassword, isPending, isSuccess } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  if (!token) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center p-4">
        <Card variant="default" className="w-full text-center">
          <h2 className="mb-4 font-gothic-title text-2xl text-danger">
            Щось пішло не так...
          </h2>
          <p className="font-mono text-sm text-text-muted mb-6">
            Посилання для відновлення паролю відсутнє або пошкоджене. Будь
            ласка, спробуйте знову.
          </p>
          <Button onClick={() => navigate("/auth")}>
            Повернутися до входу
          </Button>
        </Card>
      </div>
    );
  }

  function onSubmit(data: ResetPasswordForm) {
    // stupid guard just to satisfy typescript, user won't have access to this functionality without token anyway
    if (!token) return;
    resetPassword(
      { token, newPassword: data.newPassword },
      {
        onSuccess: () => {
          setTimeout(() => navigate("/auth"), 2500);
        },
      },
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center justify-center p-4">
      <Card variant="default" className="w-full">
        <h2 className="mb-6 border-b-2 border-border-strong pb-4 text-center font-gothic-title text-2xl text-text-selected">
          Відновлення паролю
        </h2>

        {isSuccess ? (
          <div className="space-y-4 text-center">
            <p className="font-mono text-success">Пароль успішно змінено!</p>
            {/* REVIEW text loader maybe? */}
            <p className="font-mono text-xs text-text-muted animate-pulse">
              Повернення на сторінку входу...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Новий пароль"
              placeholder="••••••••"
              type="password"
              disabled={isPending}
              error={errors.newPassword?.message}
              {...register("newPassword")}
            />

            <FormInput
              label="Підтвердження паролю"
              placeholder="••••••••"
              type="password"
              disabled={isPending}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              className="mt-4 w-full"
            >
              {isPending ? "Збереження..." : "Зберегти пароль"}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}

export default ResetPasswordPage;
