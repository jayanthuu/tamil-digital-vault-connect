import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Departments from "./Departments";

interface User {
  name: string;
  username: string;
  userType: 'user' | 'department';
}

const ProtectedDepartments = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you would check authentication status from localStorage, sessionStorage, or API
    // For demo purposes, we'll simulate a logged-in user
    const mockUser = {
      name: "Tamil User",
      username: "user123",
      userType: 'user' as const
    };
    setUser(mockUser);
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  // Show loading state while checking authentication
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return <Departments user={user} onLogout={handleLogout} />;
};

export default ProtectedDepartments;