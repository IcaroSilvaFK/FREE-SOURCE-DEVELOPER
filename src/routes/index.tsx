import { Outlet, createBrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { Layout } from "../layout";
import { CreateNewProject } from "../pages/CreateNewProject";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { Project } from "../pages/Project";
import { projectService } from "../services/project.service";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    ),
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/app",
        element: <Layout />,
        children: [
          {
            path: "/app/home",
            element: <HomePage />,
            loader: async () => {
              const data = await projectService.getAllProjects();

              return data;
            },
          },
          {
            path: "/app/project/:id",
            element: <Project />,
            loader: async ({ params }) => {
              const { id } = params as {
                id: string;
              };

              const data = await projectService.getProjectById(id);

              return data;
            },
          },
          {
            path: "/app/project/create",
            element: <CreateNewProject />,
          },
        ],
      },
    ],
  },
]);
