import styles from "./styles.module.scss";

type Props = {
  label: string;
  type: "outline" | "fill";
  color: "red" | "blue" | "purple";
};

export function Chip(props: Props) {
  const { label, type, color } = props;

  const classCustom = `chip__${type}__${color}`;

  return (
    <span className={`${styles.container__chip} ${styles[classCustom]}`}>
      {label}
    </span>
  );
}
