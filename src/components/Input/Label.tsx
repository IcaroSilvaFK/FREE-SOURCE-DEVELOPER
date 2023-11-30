import { LabelHTMLAttributes, ReactNode, forwardRef } from "react";

import styles from "./Label.module.scss";

type Props = {
  children: ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<HTMLLabelElement, Props>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <label className={styles.input__label} {...rest} ref={ref}>
      {children}
    </label>
  );
});
