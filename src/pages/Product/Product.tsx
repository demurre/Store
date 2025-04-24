// Product.tsx
import { Await, useLoaderData } from "react-router-dom";
import { MouseEvent, Suspense } from "react";
import { Product as ProductInterface } from "../../interfaces/product.interface";
import styles from "./Product.module.css";
import Headling from "../../components/Headling/Headling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { add } from "../../store/cart.slice"; // Import specific action
import { AppDispatch } from "../../store/store";

export function Product() {
  const { data } = useLoaderData() as {
    data: Promise<{ data: ProductInterface }>;
  };
  const dispatch = useDispatch<AppDispatch>(); // Fixed spelling

  const addToCart = (e: MouseEvent, id: number) => {
    e.preventDefault();
    dispatch(add(id)); // Use directly imported action
  };

  return (
    <Suspense fallback={<>Loading...</>}>
      <Await resolve={data}>
        {({ data }: { data: ProductInterface }) => (
          <div className={styles.product} id="product-content">
            <img
              className={styles.imageContainer}
              src={data.image}
              alt={data.title}
            />
            <div className={styles.content}>
              <Headling>{data.title}</Headling>
              <div className={styles.line}>
                <div className={styles.text}>Price</div>
                <div className={styles.price}>
                  {data.price.toFixed(2)}&nbsp;
                  <span>$</span>
                </div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.line}>
                <div>Rating</div>
                <div className={styles.rating}>
                  {data.rating.rate} &nbsp;
                  <FontAwesomeIcon style={{ color: "#ffc529" }} icon={faStar} />
                </div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.description}>{data.description}</div>
              <Button onClick={(e) => addToCart(e, data.id)}>
                Add to cart &nbsp;
                <FontAwesomeIcon
                  style={{ color: "var(--white-color)" }}
                  icon={faBasketShopping}
                />
              </Button>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
