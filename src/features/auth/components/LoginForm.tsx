import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import {
  LoginUserSchema,
  type LoginUserDTO,
} from "../../../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import FormInput from "../../../components/FormInput";
import Alert from "../../../components/ui/Alert";
import type { AuthMode } from "../../../pages/AuthPage";

interface LoginFormProps {
  onToggle: (mode: AuthMode) => void;
}

function LoginForm({ onToggle }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserDTO>({ resolver: zodResolver(LoginUserSchema) });

  const { login, isPending, error } = useLogin();

  function onSubmit(data: LoginUserDTO) {
    login(data);
  }

  return (
    <Card variant="default" className="w-full">
      <h2 className="mb-6 border-b-2 border-border-strong pb-4 font-gothic-title text-2xl text-text-selected text-center">
        Вхід
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        <FormInput
          label="Електронна пошта"
          placeholder="john@dnd.com"
          type="email"
          disabled={isPending}
          error={errors.email?.message}
          {...register("email")}
        />

        <FormInput
          label="Пароль"
          placeholder="••••••••"
          type="password"
          disabled={isPending}
          error={errors.password?.message}
          {...register("password")}
          labelAction={
            <button
              type="button"
              onClick={() => onToggle("forgot")}
              className="font-mono text-xs text-text-muted underline decoration-transparent transition-all hover:text-text-selected hover:decoration-text-selected focus:outline-none"
            >
              Забули пароль?
            </button>
          }
        />

        {/* {error && (
          <div className="border border-danger-muted bg-danger-surface p-2 text-center font-mono text-xs text-danger">
            {error.message}
          </div>
        )} */}
        <Alert variant="error" className="text-center">
          {error?.message}
        </Alert>

        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          className="mt-2 w-full"
        >
          {isPending ? "Вхід..." : "Увійти"}
        </Button>
      </form>

      <div className="mt-6 text-center font-mono text-xs text-text-muted">
        <span>Не маєте акаунту? </span>
        <button
          type="button"
          onClick={() => onToggle("register")}
          className="font-bold text-text-primary underline decoration-text-muted transition-all hover:text-text-selected hover:decoration-text-selected"
        >
          Зареєструватися
        </button>
      </div>
    </Card>
  );
}

export default LoginForm;
