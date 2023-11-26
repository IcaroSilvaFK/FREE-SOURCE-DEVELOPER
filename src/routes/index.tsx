import { Outlet, createBrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
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
        path: "/home",
        element: <HomePage />,
        loader: async () => {
          const data = await projectService.getAllProjects();

          return data;
        },
        shouldRevalidate: ({ formAction }) => {
          console.log({ formAction });
          return true;
        },
      },
      {
        path: "/project/:id",
        element: <Project />,
        loader: async ({ params }) => {
          const { id } = params as {
            id: string;
          };

          const data = await projectService.getProjectById(id);

          return data;
        },
      },
    ],
  },
]);
