import { Navigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { supaClient } from "../../config/supa-client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export function Login() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supaClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supaClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className={styles["login"]}>
        <Auth
          supabaseClient={supaClient}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "var(--primary-color)",
                  brandAccent: "var(--primary-hover-color)",
                },
              },
            },
          }}
          providers={[]}
        />
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}
