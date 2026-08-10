import { useState } from "react";
import LoginForm from "../features/auth/components/LoginForm";
import RegisterForm from "../features/auth/components/RegisterForm";
import ForgotPasswordForm from "../features/auth/components/ForgotPasswordForm";

export type AuthMode = "login" | "register" | "forgot";

function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  function changeMode(newMode: AuthMode) {
    setMode(newMode);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-text-primary selection:bg-background-selected selection:text-text-selected">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-osr-title text-4xl text-text-selected drop-shadow-md">
            OSR Monolith
          </h1>
          <p className="mt-2 font-mono text-sm text-text-muted">
            {mode === "login" && "З поверненням!"}
            {/* CHANGE do better motivational text fr */}
            {mode === "register" &&
              "Почніть використовувати Monolith вже зараз!"}
            {mode === "forgot" && "Відновлення доступу"}
          </p>
        </div>

        {mode === "login" && <LoginForm onToggle={changeMode} />}
        {mode === "register" && <RegisterForm onToggle={changeMode} />}
        {mode === "forgot" && <ForgotPasswordForm onToggle={changeMode} />}
      </div>
    </div>
  );
}

export default AuthPage;
