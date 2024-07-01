import { ReactNode, useEffect } from "react";
import { useSession } from "../hooks/use-session";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  // const session = useSession();

  // return session ? <>{children}</> : <Navigate to="/auth/login" replace />;
  return <>{children}</>;
};
