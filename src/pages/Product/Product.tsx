import { Await, useLoaderData } from "react-router-dom";
import { MouseEvent, Suspense } from "react";
import { Product as ProductInterface } from "../../interfaces/product.interface";
import styles from "./Product.module.css";
import Headling from "../../components/Headling/Headling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart.slice";
import { AppDispath } from "../../store/store";

export function Product() {
  const { data } = useLoaderData() as {
    data: Promise<{ data: ProductInterface }>;
  };
  const dispatch = useDispatch<AppDispath>();

  const add = (e: MouseEvent, id: number) => {
    e.preventDefault();
    dispatch(cartActions.add(id));
  };

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <Await resolve={data}>
          {({ data }: { data: ProductInterface }) => (
            <div className={styles.product}>
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
                    <FontAwesomeIcon
                      style={{ color: "#ffc529" }}
                      icon={faStar}
                    />
                  </div>
                </div>
                <hr className={styles.hr} />
                <div className={styles.description}>
                  Description <br />
                  {data.description}
                </div>
                <Button onClick={(e) => add(e, data.id)}>
                  Add to cart
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
    </>
  );
}
