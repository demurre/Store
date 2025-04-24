// ProductCard.tsx
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { add } from "../../store/cart.slice"; // Import specific action
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBasketShopping } from "@fortawesome/free-solid-svg-icons";

function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>(); // Fixed spelling

  const addToCart = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(add(props.id)); // Use directly imported action
  };

  return (
    <Link to={`/product/${props.id}`} className={styles["link"]}>
      <div className={styles["card"]}>
        <div
          className={styles["head"]}
          style={{ backgroundImage: `url(${props.image})` }}
        >
          <div className={styles["price"]}>
            {props.price} &nbsp;<span className={styles["currency"]}>$</span>
          </div>
          <button
            className={styles["add-to-cart"]}
            onClick={addToCart}
            id="add-to-cart"
          >
            <FontAwesomeIcon
              style={{ color: "var(--white-color)" }}
              icon={faBasketShopping}
            />
          </button>
          <div className={styles["rating"]}>
            {props.rating} &nbsp;
            <FontAwesomeIcon style={{ color: "#ffc529" }} icon={faStar} />
          </div>
        </div>
        <div className={styles["card-content"]}>
          <div className={styles["footer"]}>
            <div className={styles["title"]} id="product-title">
              {props.title}
            </div>
            <div className={styles["description"]}>{props.description}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
