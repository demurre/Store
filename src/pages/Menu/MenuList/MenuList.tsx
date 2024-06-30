import ProductCard from "../../../components/ProductCard/ProductCard";
import { MenuListProps } from "./MenuList.props";
import styles from "./MenuList.module.css";

export function MenuList({ products }: MenuListProps) {
  return (
    <div className={styles["wrapper"]}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          title={p.title}
          description={p.description}
          price={p.price}
          image={p.image}
          rating={p.rating.rate}
        />
      ))}
    </div>
  );
}
