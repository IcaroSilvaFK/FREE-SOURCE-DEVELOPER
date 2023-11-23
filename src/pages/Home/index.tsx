/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import { IUserDTO } from "../../interfaces/UserDTO";
import { userStore } from "../../store/user.store";

import { Header } from "../../components/Header";

import { CardProject } from "../../components/CardProject";

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
    <>
      <Header />
      <main className={styles.container__home}>
        <h1>Projetos</h1>
        <ul>
          {Array.from({ length: 100 }).map(() => (
            <CardProject />
          ))}
        </ul>
      </main>
    </>
  );
}
