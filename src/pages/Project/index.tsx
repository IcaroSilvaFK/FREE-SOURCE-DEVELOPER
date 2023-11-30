import MarkdownPreview from "@uiw/react-markdown-preview";
import { FaHouseUser } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import { Link, useLoaderData } from "react-router-dom";

import { Header } from "../../components/Header";
import { Output } from "../../services/project.service";

import { Chip } from "../../components/Chip";
import styles from "./styles.module.scss";

export function Project() {
  const data = useLoaderData() as Output;

  return (
    <main className={styles.container__project}>
      <Header />
      <nav>
        <ul>
          <li>
            <Link to="/home">
              <FaHouseUser />
              <span>Home</span>
            </Link>
          </li>
          <li>/</li>
          <li>
            <span>{data?.project_name}</span>
          </li>
        </ul>
      </nav>
      <section>
        <header>
          <h1>{data?.project_name}</h1>

          <Chip label={data?.project_type} color="purple" type="fill" />
        </header>
        <div className={styles.container__stack}>
          <h3>Stack</h3>
          <ul>
            {data?.tecs.map((tec) => (
              <li key={tec}>
                <Chip label={tec} color="blue" type="outline" />
              </li>
            ))}
          </ul>
        </div>
        <MarkdownPreview source={data?.project_description} />
        <a href={data?.link_to_social_media}>
          <FiLink />
          Entrar na comunidade
        </a>
      </section>
    </main>
  );
}
