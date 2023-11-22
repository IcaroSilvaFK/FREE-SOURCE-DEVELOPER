/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import { IUserDTO } from "../../interfaces/UserDTO";
import { userStore } from "../../store/user.store";

import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

export function HomePage() {
  const data = useLoaderData() as unknown as IUserDTO;
  const { setUser } = userStore((state) => state);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <main className={styles.container__home}>
      <Header />
      <h1>Home</h1>
    </main>
  );
}
