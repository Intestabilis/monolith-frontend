import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  function toggleForm() {
    setIsLogin((prev) => !prev);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-text-primary selection:bg-background-selected selection:text-text-selected">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-osr-title text-4xl text-text-selected drop-shadow-md">
            OSR Monolith
          </h1>
          <p className="mt-2 font-mono text-sm text-text-muted">
            {isLogin
              ? "З поверненням!"
              : "Якийсь мотивуючий зареєструватись і юзати сайт текст"}
          </p>
        </div>

        {/* Рендеримо відповідну форму */}
        {isLogin ? (
          <LoginForm onToggle={toggleForm} />
        ) : (
          <RegisterForm onToggle={toggleForm} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;
