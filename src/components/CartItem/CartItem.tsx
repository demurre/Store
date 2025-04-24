// CartItem.tsx
import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { add, remove, deleteItem } from "../../store/cart.slice"; // Import individual actions
import { CartItemProps } from "./CartItem.props";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>(); // Fixed spelling

  const increase = () => {
    dispatch(add(props.id)); // Use directly imported action
  };

  const decrease = () => {
    // Fixed typo in function name
    dispatch(remove(props.id));
  };

  const removeFromCart = () => {
    dispatch(deleteItem(props.id));
  };

  return (
    <div className={styles["item"]} id="cart-item">
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>
      <div className={styles["description"]}>
        <div className={styles["name"]}>{props.title}</div>
        <div className={styles["price"]}>{props.price}&nbsp;$</div>
      </div>
      <div className={styles["actions"]}>
        <button
          className={styles["minus"]}
          onClick={decrease} // Fixed function name
          id="decrease-btn"
        >
          <FontAwesomeIcon
            style={{ color: "var(--primary-color)" }}
            icon={faMinus}
          />
        </button>
        <div className={styles["number"]} id="item-count">
          {props.count}
        </div>
        <button className={styles["plus"]} onClick={increase} id="increase-btn">
          <FontAwesomeIcon
            style={{ color: "var(--white-color)" }}
            icon={faPlus}
          />
        </button>
        <button
          className={styles["remove"]}
          onClick={removeFromCart}
          id="remove-btn"
        >
          <FontAwesomeIcon
            style={{ color: "var(--primary-color)" }}
            icon={faXmark}
          />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
