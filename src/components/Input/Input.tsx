import { InputHTMLAttributes, forwardRef } from "react";

import styles from "./Input.module.scss";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <input className={styles.input} {...props} ref={ref} />;
});
