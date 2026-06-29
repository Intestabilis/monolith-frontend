import { useForm } from "react-hook-form";
import { CreateUserSchema, type CreateUserDTO } from "../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../features/auth/hooks/useRegister";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Alert from "./ui/Alert";
import FormInput from "./FormInput";

interface RegisterFormProps {
  onToggle: () => void;
}

function RegisterForm({ onToggle }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDTO>({ resolver: zodResolver(CreateUserSchema) });

  const { register: registerUser, isPending, error } = useRegister();
  function onSubmit(data: CreateUserDTO) {
    const { confirmPassword, ...userData } = data;
    registerUser(userData);
  }

  return (
    <Card variant="default" className="w-full">
      <h2 className="mb-6 border-b-2 border-border-strong pb-4 font-osr-title text-2xl text-text-selected text-center">
        Реєстрація
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Нікнейм"
          placeholder="John Pork"
          type="text"
          disabled={isPending}
          error={errors.username?.message}
          {...register("username")}
        />

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
        />

        <FormInput
          label="Підтвердження паролю"
          placeholder="••••••••"
          type="password"
          disabled={isPending}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Alert variant="error" className="text-center">
          {error?.message}
        </Alert>

        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          className="mt-2 w-full"
        >
          {isPending ? "Створюємо запис..." : "Зареєструватися"}
        </Button>
      </form>

      <div className="mt-6 text-center font-mono text-xs text-text-muted">
        <span>Вже маєте акаунт? </span>
        <button
          type="button"
          onClick={onToggle}
          className="font-bold text-text-primary underline decoration-text-muted transition-all hover:text-text-selected hover:decoration-text-selected"
        >
          Повернутися до входу
        </button>
      </div>
    </Card>
  );
}

export default RegisterForm;
