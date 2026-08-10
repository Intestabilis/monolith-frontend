import type { PropsWithChildren } from "react";
import Button from "../../../components/ui/Button";
import { useLogout } from "../hooks/useLogout";

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
