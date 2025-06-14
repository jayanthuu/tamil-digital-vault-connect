import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/LoginForm";
import Departments from "./Departments";

interface User {
  name: string;
  username: string;
  userType: 'user' | 'department';
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleLogin = (credentials: { username: string; password: string; userType: 'user' | 'department' }) => {
    // In a real app, you would validate credentials with an API
    // For demo purposes, we'll accept any credentials
    const userData = {
      name: credentials.userType === 'user' ? "Tamil User" : "Department Officer",
      username: credentials.username,
      userType: credentials.userType
    };
    
    setUser(userData);
    
    // Navigate to department dashboard if department login
    if (credentials.userType === 'department') {
      navigate('/department');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user && user.userType === 'user') {
    return <Departments user={user} onLogout={handleLogout} />;
  }

  return <LoginForm onLogin={handleLogin} />;
};

export default Index;
