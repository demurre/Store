import { useSession } from "../hooks/use-session";
import { UserContext } from "../layout/Auth/AuthLayout";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { session, profile } = useSession();

  return (
    <UserContext.Provider value={{ session, profile }}>
      {children}
    </UserContext.Provider>
  );
};
