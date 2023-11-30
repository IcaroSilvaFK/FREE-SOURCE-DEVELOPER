import { ReactNode } from "react";

import styles from "./Container.module.scss";

type Props = {
  children: ReactNode;
};
export function Container(props: Props) {
  const { children } = props;

  return (
    <nav>
      <ul className={styles.container__breadcrumbs}>{children}</ul>
    </nav>
  );
}
