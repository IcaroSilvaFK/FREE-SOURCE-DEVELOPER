import { ReactNode } from "react";

import styles from "./Item.module.scss";

type Props = {
  children: ReactNode;
  isActive?: boolean;
};
export function Item(props: Props) {
  const { children, isActive } = props;

  return (
    <li
      className={`${styles.breadcrumb__item} ${
        isActive ? styles.breadcrumb__item__active : ""
      }`}
    >
      <span>{children}</span>
    </li>
  );
}
