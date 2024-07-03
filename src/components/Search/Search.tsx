import { forwardRef } from "react";
import styles from "./Search.module.css";
import cn from "classnames";
import { SearchProps } from "./Search.props";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
  { isValid = true, className, ...props },
  ref
) {
  return (
    <div className={styles["input-wrapper"]}>
      <input
        ref={ref}
        className={cn(styles["input"], className, {
          [styles["invalid"]]: isValid,
        })}
        {...props}
      />
      <FontAwesomeIcon className={styles["icon"]} icon={faMagnifyingGlass} />
    </div>
  );
});

export default Search;
