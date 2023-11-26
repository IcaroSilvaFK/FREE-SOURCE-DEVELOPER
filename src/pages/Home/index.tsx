/* eslint-disable react-hooks/exhaustive-deps */
import { useLoaderData } from "react-router-dom";

import { Header } from "../../components/Header";

import { CardProject } from "../../components/CardProject";

import { LuPlus } from "react-icons/lu";
import { Button } from "../../components/Button";
import { ModalCreateNewProject } from "../../components/ModalCreateNewProject";
import { Output } from "../../services/project.service";
import styles from "./styles.module.scss";

export function HomePage() {
  const projects = useLoaderData() as unknown as Output[];

  return (
    <>
      <Header />
      <main className={styles.container__home}>
        <header>
          <h1>Projetos</h1>
          <ModalCreateNewProject>
            <Button variant="outline" color="blue">
              Criar
              <LuPlus />
            </Button>
          </ModalCreateNewProject>
        </header>

        <ul>
          {projects?.map((project) => (
            <CardProject key={project.id} {...project} />
          ))}
        </ul>
      </main>
    </>
  );
}
