import type { PropsWithChildren } from "react";
import { useLogout } from "../features/auth/hooks/useLogout";
import Button from "./ui/Button";

interface LogoutButtonProps {
  loadingText?: string;
}

function LogoutButton({
  loadingText,
  children,
}: PropsWithChildren<LogoutButtonProps>) {
  const { logout, isPending } = useLogout();
  return (
    <Button onClick={() => logout()} variant="destructive" size="default">
      {isPending && loadingText ? loadingText : children}
    </Button>
  );
}

export default LogoutButton;
