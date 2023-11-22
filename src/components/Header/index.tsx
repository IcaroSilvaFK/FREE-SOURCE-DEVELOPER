import { LuXCircle } from "react-icons/lu";
import { userStore } from "../../store/user.store";
import styles from "./styles.module.scss";

export function Header() {
  const { user } = userStore((state) => state);

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
          <button>
            <LuXCircle size={22} />
          </button>
        </div>
      )}
    </header>
  );
}
