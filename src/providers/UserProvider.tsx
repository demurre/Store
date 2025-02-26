import { useSession } from "../hooks/useSession";
import { UserContext } from "../layout/Auth/AuthLayout";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { session, profile, isLoading, error, refreshProfile } = useSession();

  return (
    <UserContext.Provider
      value={{ session, profile, isLoading, error, refreshProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};
