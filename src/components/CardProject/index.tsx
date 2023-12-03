import { useNavigate } from "react-router-dom";

import { formatPassedToNow } from "../../utils/formatPassedToNow";
import { Button } from "../Button";
import { Chip } from "../Chip";

import { ProjectDTO } from "../../interfaces/ProjectDTO";
import styles from "./styles.module.scss";

export function CardProject(props: ProjectDTO) {
  const { project_name, tecs, user, created_at, id } = props;

  const navigator = useNavigate();

  const date = new Date(created_at);

  const passed = formatPassedToNow(date);

  function navigateToDetails() {
    navigator(`/app/project/${id}`);
  }

  return (
    <li className={styles.container__card}>
      <header>
        <div>
          <img src={user?.avatar_url} alt={user?.username} />
          <div>
            <strong>{user?.username}</strong>
            <span>{passed}</span>
          </div>
        </div>
        <Chip color="red" label="front-end" type="outline" />
      </header>
      <p>{project_name}</p>
      <footer>
        <ul>
          {tecs.map((tec) => (
            <Chip color="blue" label={tec} type="outline" key={tec} />
          ))}
        </ul>
        <Button variant="outline" color="purple" onClick={navigateToDetails}>
          Detalhes
        </Button>
      </footer>
    </li>
  );
}
