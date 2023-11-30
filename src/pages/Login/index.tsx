/* eslint-disable react-hooks/exhaustive-deps */
import { FaGithub } from "react-icons/fa";

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { userStore } from "../../store/user.store";
import styles from "./styles.module.scss";

export function LoginPage() {
  const { user, setUser } = userStore((state) => state);
  const navigator = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigator("/app/home");
    }
  }, [user, navigator]);

  function handleSignInWithGithub() {
    const randomState = window.crypto.randomUUID();

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&state=${randomState}&scope=user`;
  }

  const handleGetUserInfos = useCallback(async () => {
    try {
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) {
        return;
      }

      setIsLoading(true);
      const token = await authService.requestCredentials(code);

      const user = await authService.requestUserDetails(token);

      setUser(user);
      navigator("/app/home");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    handleGetUserInfos();
  }, []);

  return (
    <main className={styles.container__main}>
      <div>
        <h1>
          Plataforma de desenvolvimento open source de <span>DEV</span> para{" "}
          <span>DEV</span>
        </h1>

        <button onClick={handleSignInWithGithub} disabled={isLoading}>
          {!isLoading && (
            <>
              <span>Entrar com o github</span>
              <FaGithub size={32} />
            </>
          )}

          {isLoading && <img src="/assets/loading.svg" />}
        </button>
      </div>
    </main>
  );
}
