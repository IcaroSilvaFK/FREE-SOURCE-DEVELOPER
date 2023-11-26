import { ButtonHTMLAttributes, ReactNode, forwardRef, useMemo } from "react";

import styles from "./styles.module.scss";

type ButtonProps = {
  children: ReactNode;
  variant: "solid" | "outline" | "link";
  color: "red" | "blue" | "purple";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, variant, color, ...rest } = props;

    const buttonVariant = useMemo(
      () => `button__${variant}__${color}`,
      [variant, color]
    );

    return (
      <button
        className={`${styles.button__base} ${styles[buttonVariant]}`}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "button";
