import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import Departments from "./Departments";

interface User {
  name: string;
  username: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (credentials: { username: string; password: string }) => {
    // In a real app, you would validate credentials with an API
    // For demo purposes, we'll accept any credentials
    setUser({
      name: "Tamil User",
      username: credentials.username
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return <Departments user={user} onLogout={handleLogout} />;
  }

  return <LoginForm onLogin={handleLogin} />;
};

export default Index;
