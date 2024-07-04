import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supaClient } from "../config/supa-client";

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supaClient.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/auth/login");
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
};

export default RequireAuth;
