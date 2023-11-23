import { userStore } from "../../store/user.store";
import { formatPassedToNow } from "../../utils/formatPassedToNow";
import { Chip } from "../Chip";

import styles from "./styles.module.scss";

const tecs = ["TypeScript", "React", "Next", "Node"];

export function CardProject() {
  const { user } = userStore((state) => state);

  const date = new Date();

  const passedDate = date.setDate(date.getDate() - Math.random() * 30);
  const castingToDate = new Date(passedDate);
  const passed = formatPassedToNow(castingToDate);

  return (
    <li className={styles.container__card}>
      <header>
        <div>
          <img src={user?.avatar_url} alt={user?.name} />
          <div>
            <strong>{user?.name}</strong>
            <span>{passed}</span>
          </div>
        </div>
        <Chip color="purple" label="front-end" type="outline" />
      </header>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
        perferendis ipsa sunt tempora possimus animi nihil enim quos esse est,
        dolore earum doloribus doloremque recusandae iusto fuga voluptates nulla
        voluptate.
      </p>
      <footer>
        <ul>
          {tecs.map((tec) => (
            <Chip color="blue" label={tec} type="outline" key={tec} />
          ))}
        </ul>
        <button>Detalhes</button>
      </footer>
    </li>
  );
}
