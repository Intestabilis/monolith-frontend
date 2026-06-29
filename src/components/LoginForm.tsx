import { useForm } from "react-hook-form";
import { useLogin } from "../features/auth/hooks/useLogin";
import { LoginUserSchema, type LoginUserDTO } from "../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./ui/Button";
import Card from "./ui/Card";
import FormInput from "./FormInput";
import Alert from "./ui/Alert";

interface LoginFormProps {
  onToggle: () => void;
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
      <h2 className="mb-6 border-b-2 border-border-strong pb-4 font-osr-title text-2xl text-text-selected text-center">
        Вхід
      </h2>

      {/* REVIEW this and Register form - maybe should create a FormInput component and reuse it, through I'm not sure because of possible*/}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Поле Email */}
        <FormInput
          label="Електронна пошта"
          placeholder="john@dnd.com"
          type="email"
          disabled={isPending}
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Поле Пароль */}
        <FormInput
          label="Пароль"
          placeholder="••••••••"
          type="password"
          disabled={isPending}
          error={errors.password?.message}
          {...register("password")}
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
          {isPending ? "Відкриваємо двері..." : "Увійти"}
        </Button>
      </form>

      <div className="mt-6 text-center font-mono text-xs text-text-muted">
        <span>Не маєте акаунту? </span>
        <button
          type="button"
          onClick={onToggle}
          className="font-bold text-text-primary underline decoration-text-muted transition-all hover:text-text-selected hover:decoration-text-selected"
        >
          Зареєструватися
        </button>
      </div>
    </Card>
  );
}

export default LoginForm;
