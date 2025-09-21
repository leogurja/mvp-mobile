"use client";

import { useAuth } from "./auth-provider";
import LoginModal from "./login-modal";
import Button from "./ui/button";

export default function UserSection() {
  const { token, setToken } = useAuth();

  const handleLogout = () => setToken(null);

  if (token == null) return <LoginModal />;

  return (
    <Button variant="ghost" size="sm" className="w-full" onClick={handleLogout}>
      Logout
    </Button>
  );
}
