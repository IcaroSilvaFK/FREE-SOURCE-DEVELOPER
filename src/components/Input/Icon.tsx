import { ReactNode } from "react";

import styles from "./Icon.module.scss";

type Props = {
  children: ReactNode;
};

export function Icon(props: Props) {
  const { children } = props;

  return <div className={styles.container__icon}>{children}</div>;
}
