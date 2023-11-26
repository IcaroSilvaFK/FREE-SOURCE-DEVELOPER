import { ReactNode } from "react";

import styles from "./Container.module.scss";

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className={styles.container__input}>{children}</div>;
}
