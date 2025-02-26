import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Success.module.css";

export function Success() {
  const navigate = useNavigate();
  return (
    <div className={styles["success"]}>
      {/* <img
        src="/user.png"
        alt="image"
        width={500}
        height={500}
        style={{ borderRadius: "50%" }}
      /> */}
      <div className={styles["text"]}>
        Your order has been successfully placed!
      </div>
      <Button appearence="big" onClick={() => navigate("/")}>
        Create new order
      </Button>
    </div>
  );
}
