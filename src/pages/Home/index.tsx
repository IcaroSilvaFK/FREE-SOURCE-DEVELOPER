/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLoaderData } from "react-router-dom";

import { CardProject } from "../../components/CardProject";

import { LuPlus } from "react-icons/lu";
import { Output } from "../../services/project.service";
import styles from "./styles.module.scss";

export function HomePage() {
  const projects = useLoaderData() as unknown as Output[];

  return (
    <>
      <section className={styles.container__home}>
        <header>
          <h1>Projetos</h1>
          <Link to="/app/project/create">
            <LuPlus fontWeight="bold" size={20} />
            <span>Novo Projeto</span>
          </Link>
        </header>

        <ul>
          {projects?.map((project) => (
            <CardProject key={project.id} {...project} />
          ))}
        </ul>
      </section>
    </>
  );
}
