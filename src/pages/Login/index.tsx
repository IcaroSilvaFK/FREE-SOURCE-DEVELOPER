import { FaGithub } from "react-icons/fa";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/user.store";
import styles from "./styles.module.scss";

export function LoginPage() {
  const { user } = userStore((state) => state);
  const navigator = useNavigate();

  useEffect(() => {
    if (user) {
      navigator("/home");
    }
  }, [user, navigator]);

  function handleSignInWithGithub() {
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=59928a2b5e7e2e57d58a";
  }

  return (
    <main className={styles.container__main}>
      <div>
        <h1>
          Plataforma de desenvolvimento open source de <span>DEV</span> para{" "}
          <span>DEV</span>
        </h1>

        <button onClick={handleSignInWithGithub}>
          <span>Entrar com o github</span>
          <FaGithub size={32} />
        </button>
      </div>
    </main>
  );
}
