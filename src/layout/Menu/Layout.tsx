import cn from "classnames";
import Button from "../../components/Button/Button";
import styles from "./Layout.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supaClient } from "../../config/supa-client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  faBars,
  faCartShopping,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Layout() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState();
  const items = useSelector((s: RootState) => s.cart.items);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supaClient.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      }
    };

    fetchUser();
  }, []);

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
            <div className={styles["email"]}>{userEmail}</div>
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
              <FontAwesomeIcon icon={faBars} />
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
              <FontAwesomeIcon icon={faCartShopping} />
              Cart
              <span className={styles["cart-count"]}>
                {items.reduce((acc, item) => (acc += item.count), 0)}
              </span>
            </NavLink>
          </div>
          <Button className={styles["exit"]} onClick={logout}>
            <FontAwesomeIcon icon={faPowerOff} /> Exit
          </Button>
        </div>
        <div className={styles["content"]}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
