import { LuXCircle } from "react-icons/lu";

import { userStore } from "../../store/user.store";

import { Tooltip } from "../Tooltip";
import styles from "./styles.module.scss";

export function Header() {
  const { user, removeUser } = userStore((state) => state);

  return (
    <header className={styles.container__header}>
      <h2>Free Source Developer</h2>

      {user && (
        <div>
          <img src={user.avatar_url} alt={user.name} />
          <div>
            <strong>{user.name}</strong>
            <p>{user?.company}</p>
          </div>
          <Tooltip content="Sair">
            <button onClick={removeUser}>
              <LuXCircle size={22} />
            </button>
          </Tooltip>
        </div>
      )}
    </header>
  );
}
