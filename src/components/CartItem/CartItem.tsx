import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { AppDispath } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import { CartItemProps } from "./CartItem.props";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispath>();

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const descrease = () => {
    dispatch(cartActions.remove(props.id));
  };

  const remove = () => {
    dispatch(cartActions.delete(props.id));
  };

  return (
    <div className={styles["item"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>
      <div className={styles["description"]}>
        <div className={styles["name"]}>{props.title}</div>
        <div className={styles["price"]}>{props.price}&nbsp;$</div>
      </div>
      <div className={styles["actions"]}>
        <button className={styles["minus"]} onClick={descrease}>
          <FontAwesomeIcon
            style={{ color: "var(--primary-color)" }}
            icon={faMinus}
          />
        </button>
        <div className={styles["number"]}>{props.count}</div>
        <button className={styles["plus"]} onClick={increase}>
          <FontAwesomeIcon
            style={{ color: "var(--white-color)" }}
            icon={faPlus}
          />
        </button>
        <button className={styles["remove"]} onClick={remove}>
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
