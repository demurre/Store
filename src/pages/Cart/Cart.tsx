// Cart.tsx
import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interface";
import { PREFIX } from "../../helpers/API";
import axios from "axios";
import CartItem from "../../components/CartItem/CartItem";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { clean } from "../../store/cart.slice"; // Import specific action

export function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch<AppDispatch>(); // Fixed spelling
  const navigate = useNavigate();

  const total = items
    .map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);
      return product ? i.count * product.price : 0;
    })
    .reduce((acc, i) => acc + i, 0)
    .toFixed(2);

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(res);
  };

  const checkout = async () => {
    await axios.post(`${PREFIX}/carts`, { products: items });
    dispatch(clean()); // Use directly imported action
    navigate("/success");
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <>
      <Headling className={styles["headling"]}>Cart</Headling>
      {items.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);
        return product ? (
          <CartItem key={i.id} count={i.count} {...product} /> // Added key prop
        ) : null;
      })}
      <div className={styles["line"]}>
        <div className={styles["text"]}>
          Total&nbsp;
          <span className={styles["total-count"]}>({items.length})</span>
        </div>
        <div className={styles["price"]}>
          {total}
          &nbsp;<span>$</span>
        </div>
      </div>
      <div className={styles["checkout"]}>
        <Button appearence="big" onClick={checkout} id="checkout-btn">
          Checkout
        </Button>
      </div>
    </>
  );
}
