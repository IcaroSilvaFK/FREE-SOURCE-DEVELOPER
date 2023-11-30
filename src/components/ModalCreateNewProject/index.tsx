import { zodResolver } from "@hookform/resolvers/zod";
import * as PrimitiveDialog from "@radix-ui/react-dialog";
import MDEditor from "@uiw/react-md-editor";
import { KeyboardEvent, ReactNode, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaLink, FaStackOverflow } from "react-icons/fa6";
import { MdOutlineTitle } from "react-icons/md";
import CreatableSelect from "react-select/creatable";
import { z } from "zod";
import * as InputRoot from "../Input";

import { LuXCircle } from "react-icons/lu";
import { projectService } from "../../services/project.service";
import { userStore } from "../../store/user.store";
import { toUpper } from "../../utils/toUpper";
import { Button } from "../Button";
import { selectStyles } from "./selectStyles";
import styles from "./styles.module.scss";

type Props = {
  children: ReactNode;
};

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

export function ModalCreateNewProject(props: Props) {
  const { children } = props;
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
        console.log({
          ...data,
          tecs: tecs.map((tec) => tec.value),
        });
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
    <PrimitiveDialog.Root>
      <PrimitiveDialog.Trigger className={styles.DialogTrigger}>
        {children}
      </PrimitiveDialog.Trigger>
      <PrimitiveDialog.Portal>
        <PrimitiveDialog.Overlay className={styles.DialogOverlay} />
        <PrimitiveDialog.Content className={styles.DialogContent}>
          <header>
            <PrimitiveDialog.Title>Crie um novo projeto</PrimitiveDialog.Title>
            <PrimitiveDialog.Close asChild>
              <Button variant="link" color="red">
                <LuXCircle size={26} />
              </Button>
            </PrimitiveDialog.Close>
          </header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputRoot.Container>
              <InputRoot.Label htmlFor="title">
                Título do projeto
              </InputRoot.Label>
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
                <MDEditor
                  value={value}
                  onChange={onChange}
                  preview="edit"
                  data-color-mode="dark"
                />
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
              <PrimitiveDialog.Close asChild>
                <Button variant="solid" color="red" type="button">
                  Cancelar
                </Button>
              </PrimitiveDialog.Close>
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
        </PrimitiveDialog.Content>
      </PrimitiveDialog.Portal>
    </PrimitiveDialog.Root>
  );
}
