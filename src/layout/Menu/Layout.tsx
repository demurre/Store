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
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "../../hooks/useSession";

export function Layout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const items = useSelector((s: RootState) => s.cart.items);
  const { session, profile } = useSession();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("user");

  useEffect(() => {
    if (session?.user) {
      if (profile?.username) {
        setUsername(profile.username);
      }

      if (profile?.image) {
        setProfileImage(profile.image);
      }
    }
  }, [session, profile]);

  const logout = async () => {
    await supaClient.auth.signOut();
    navigate("/auth/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const avatarUrl =
    profileImage ||
    (username && username !== "username"
      ? `https://ui-avatars.com/api/?name=${username
          .charAt(0)
          .toUpperCase()}&background=random&color=fff&size=256`
      : `https://ui-avatars.com/api/?name=${
          session?.user?.email?.charAt(0).toUpperCase() || "U"
        }&background=random&color=fff&size=256`);

  return (
    <>
      <div className={styles["layout"]} data-test="shop-layout">
        <button
          className={styles["burger-btn"]}
          onClick={toggleSidebar}
          id="burger-btn"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div
          className={cn(styles["sidebar"], {
            [styles["responsive-sidebar"]]: !isSidebarOpen,
          })}
          data-test="sidebar"
        >
          <div className={styles["user"]}>
            <NavLink to="/profile">
              <img
                className={styles["avatar"]}
                src={avatarUrl}
                alt="user-avatar"
                width={100}
                height={100}
              />
            </NavLink>
            <div className={styles["name"]}>{username}</div>
            <div className={styles["email"]}>{session?.user?.email}</div>
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
              to="/profile"
              className={({ isActive }) =>
                cn(styles["link"], {
                  [styles.active]: isActive,
                })
              }
              id="profile"
            >
              <FontAwesomeIcon icon={faUser} />
              Profile
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(styles["link"], {
                  [styles.active]: isActive,
                })
              }
              id="cart"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              Cart
              <span className={styles["cart-count"]}>
                {items.reduce((acc, item) => (acc += item.count), 0)}
              </span>
            </NavLink>
          </div>
          <Button className={styles["exit"]} onClick={logout} id="logout-btn">
            <FontAwesomeIcon icon={faPowerOff} /> Exit
          </Button>
        </div>
        <div className={styles["content"]} data-test="shop-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
