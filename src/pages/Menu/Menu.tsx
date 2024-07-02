import { ChangeEvent, useEffect, useState } from "react";
import Headling from "../../components/Headling/Headling";
import Search from "../../components/Search/Search";
import { Product } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";
import { PREFIX } from "../../helpers/API";

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setIsLoading(false);
    }
  };

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    [product.title, product.description, product.category].some((field) =>
      field.toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <>
      <div className={styles["head"]}>
        <Headling>Menu</Headling>
        <Search placeholder="Enter item" onChange={updateFilter} />
      </div>
      <div>
        {error && <>{error}</>}
        {isLoading && <>Loading...</>}
        {!isLoading && filteredProducts.length > 0 && (
          <MenuList products={filteredProducts} />
        )}
        {!isLoading && filteredProducts.length === 0 && <>Not found</>}
      </div>
    </>
  );
}

export default Menu;
