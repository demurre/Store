import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import { createContext } from "react";
import { UserInfo } from "../../hooks/useSession";

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
