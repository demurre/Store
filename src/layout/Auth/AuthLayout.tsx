import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import { UserInfo } from "../../hooks/use-session";
import { createContext } from "react";

export const UserContext = createContext<UserInfo>({
  session: null,
  profile: null,
});

export function AuthLayout() {
  return (
    <>
      <div className={styles["layout"]}>
        <div className={styles["logo"]}>
          <img src="/logo.jpg" alt="logo" />
        </div>

        <div className={styles["content"]}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
