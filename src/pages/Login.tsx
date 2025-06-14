import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginForm } from "@/components/LoginForm";

interface User {
  name: string;
  username: string;
  userType: 'user' | 'department';
}

const Login = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userType = searchParams.get('type') as 'user' | 'department' || 'user';

  const handleLogin = (credentials: { username: string; password: string; userType: 'user' | 'department' }) => {
    // In a real app, you would validate credentials with an API
    // For demo purposes, we'll accept any credentials
    const userData = {
      name: credentials.userType === 'user' ? "Tamil User" : "Department Officer",
      username: credentials.username,
      userType: credentials.userType
    };
    
    setUser(userData);
    
    // Navigate based on user type
    if (credentials.userType === 'department') {
      navigate('/department');
    } else {
      navigate('/departments');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  // If user is logged in and is a regular user, redirect to departments
  if (user && user.userType === 'user') {
    navigate('/departments');
    return null;
  }

  // If user is logged in and is department, redirect to department dashboard
  if (user && user.userType === 'department') {
    navigate('/department');
    return null;
  }

  return <LoginForm onLogin={handleLogin} initialUserType={userType} />;
};

export default Login;