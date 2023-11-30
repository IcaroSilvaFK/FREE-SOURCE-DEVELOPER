import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { KeyboardEvent, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaLink, FaStackOverflow } from "react-icons/fa6";
import { MdOutlineTitle } from "react-icons/md";
import CreatableSelect from "react-select/creatable";
import { z } from "zod";
import * as InputRoot from "../../components/Input";

import * as Breadcrumbs from "../../components/Breadcrumbs";
import { Button } from "../../components/Button";
import { projectService } from "../../services/project.service";
import { userStore } from "../../store/user.store";
import { toUpper } from "../../utils/toUpper";
import { selectStyles } from "./selectStyles";

import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { notificationService } from "../../services/notifications.service";
import styles from "./styles.module.scss";

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string().url("Link inválido"),
  type: z.string(),
});

type FormType = z.infer<typeof formSchema>;

export function CreateNewProject() {
  const { user } = userStore((state) => state);
  const { register, control, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      title: "",
      description: "",
      link: "",
    },
    resolver: zodResolver(formSchema),
  });
  const [inputTecValue, setInputTecValue] = useState("");
  const [tecs, setTecs] = useState<Option[]>([]);
  const [isLoadingCreateNewProject, setIsLoadingCreateNewProject] =
    useState(false);

  const onSubmit = useCallback(
    async (data: FormType) => {
      try {
        if (!tecs.length) {
          notificationService.error("Selecione pelo menos uma tecnologia!");
          return;
        }
        setIsLoadingCreateNewProject(true);

        await projectService.createProject({
          title: data.title,
          description: data.description,
          link_to_social_media: data.link,
          project_type: data.type,
          tecs: tecs.map((tec) => tec.value),
          user: {
            email: user?.email || "",
            avatar_url: user?.avatar_url || "",
            link_to_profile: user?.url || "",
            username: user?.name ?? "",
          },
        });
        setTecs([]);
        reset();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoadingCreateNewProject(false);
      }
    },
    [user, reset, tecs]
  );

  const handleAddTec = useCallback(
    (ev: KeyboardEvent<HTMLDivElement>) => {
      if (
        toUpper(ev.key) === toUpper("Enter") ||
        toUpper(ev.key) === toUpper("Tab")
      ) {
        setTecs((prev) => [...prev, createOption(inputTecValue)]);
        setInputTecValue("");
        ev.preventDefault();
      }
    },
    [inputTecValue]
  );
  return (
    <section className={styles.create_project__container}>
      <header>
        <Breadcrumbs.Container>
          <Breadcrumbs.Item isActive>
            <Link to="/app/home">
              <FaHome />
              <span>Home</span>
            </Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item>
            <span>Criar novo projeto</span>
          </Breadcrumbs.Item>
        </Breadcrumbs.Container>
        <h3>Crie um novo projeto</h3>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputRoot.Container>
          <InputRoot.Label htmlFor="title">Título do projeto</InputRoot.Label>
          <InputRoot.Icon>
            <MdOutlineTitle />
          </InputRoot.Icon>
          <InputRoot.Input
            id="title"
            type="text"
            placeholder="Nome do projeto"
            {...register("title")}
          />
        </InputRoot.Container>
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <div className={styles.column__description}>
              <label>Tecnologias</label>
              <MDEditor
                value={value}
                onChange={onChange}
                preview="edit"
                data-color-mode="dark"
                placeholder="Descrição do projeto"
              />
            </div>
          )}
        />
        <InputRoot.Container>
          <InputRoot.Label htmlFor="title">
            Link para a comunidade
          </InputRoot.Label>
          <InputRoot.Icon>
            <FaLink />
          </InputRoot.Icon>
          <InputRoot.Input
            id="link"
            type="text"
            placeholder="Link da comunidade"
            {...register("link")}
          />
        </InputRoot.Container>
        <InputRoot.Container>
          <InputRoot.Label htmlFor="title">
            Stack usada no projeto
          </InputRoot.Label>
          <InputRoot.Icon>
            <FaStackOverflow />
          </InputRoot.Icon>
          <InputRoot.Input
            id="title"
            type="text"
            placeholder="Digite a stack ex: Frontend ou Backend ou Mobile"
            {...register("type")}
          />
        </InputRoot.Container>
        <div className={styles.container__column}>
          <label>Tecnologias</label>
          <CreatableSelect
            isClearable
            isMulti
            placeholder="Digite e aperte enter..."
            onChange={(value) => {
              setTecs(value as Option[]);
            }}
            value={tecs}
            onInputChange={(value) => setInputTecValue(value)}
            onKeyDown={handleAddTec}
            menuIsOpen={false}
            styles={selectStyles}
            inputValue={inputTecValue}
          />
        </div>

        <footer>
          <Button variant="solid" color="red" type="button">
            Cancelar
          </Button>
          <Button
            variant="solid"
            color="blue"
            type="submit"
            disabled={isLoadingCreateNewProject}
          >
            Salvar
          </Button>
        </footer>
      </form>
    </section>
  );
}
