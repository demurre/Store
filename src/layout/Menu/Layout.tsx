import cn from "classnames";
import Button from "../../components/Button/Button";
import styles from "./Layout.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supaClient } from "../../config/supa-client";

export function Layout() {
  const navigate = useNavigate();

  const logout = async () => {
    await supaClient.auth.signOut();
    navigate("/auth/login");
  };

  return (
    <>
      <div className={styles["layout"]}>
        <div className={styles["sidebar"]}>
          <div className={styles["user"]}>
            <img
              className={styles["avatar"]}
              src="/user.png"
              alt="user"
              width={100}
              height={100}
            />
            <div className={styles["name"]}>user</div>
            <div className={styles["email"]}>user@example.com</div>
          </div>
          <div className={styles["menu"]}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(styles["link"], {
                  [styles.active]: isActive,
                })
              }
            >
              <img src="/menu-icon.svg" alt="menu" />
              Menu
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(styles["link"], {
                  [styles.active]: isActive,
                })
              }
            >
              <img src="/cart-icon.svg" alt="cart" />
              Cart
            </NavLink>
          </div>
          <Button className={styles["exit"]} onClick={logout}>
            <img src="/exit-icon.svg" alt="exit" /> Exit
          </Button>
        </div>
        <div className={styles["content"]}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
