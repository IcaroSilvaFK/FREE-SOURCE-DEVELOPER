import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { authService } from "../services/auth.service";

export const router = createBrowserRouter([
  {
    index: true,
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    loader: async ({ request }) => {
      const url = request.url;
      const code = new URL(url).searchParams.get("code");

      if (!code) return null;

      const token = await authService.requestCredentials(code);
      const user = await authService.requestUserDetails(token);

      return user;
    },
  },
]);
