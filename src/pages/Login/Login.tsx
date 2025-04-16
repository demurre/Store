import { Navigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { supaClient } from "../../config/supa-client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";

export function Login() {
  const [session, setSession] = useState<Session | null>(null);

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

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles["login"]} id="login">
      <Auth
        supabaseClient={supaClient}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: {
              borderRadius: "29px",
              border: "none",
            },
            input: {
              borderRadius: "10px",
            },
          },
          variables: {
            default: {
              colors: {
                brand: "var(--primary-color)",
                brandAccent: "var(--primary-hover-color)",
              },
              fonts: {
                bodyFontFamily: `Poppins, sans-serif`,
                buttonFontFamily: `Poppins, sans-serif`,
                inputFontFamily: `Poppins, sans-serif`,
                labelFontFamily: `Poppins, sans-serif`,
              },
            },
          },
        }}
        providers={[]}
      />
    </div>
  );
}
