import Headling from "../../components/Headling/Headling";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../../components/Search/Search";
import styles from "./Menu.module.css";

export function Menu() {
  return (
    <>
      <div className={styles["head"]}>
        <Headling>Menu</Headling>
        <Search placeholder="Enter item" />
      </div>
      <div>
        <ProductCard
          id={1}
          title={"Name"}
          description={"Description"}
          price={50}
          image={"/product.jpg"}
          rating={5}
        />
      </div>
    </>
  );
}
