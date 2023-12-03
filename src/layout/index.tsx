import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { AuthContextProvider } from "../context/AuthContext";

export function Layout() {
  return (
    <AuthContextProvider>
      <main>
        <Header />
        <Outlet />
      </main>
    </AuthContextProvider>
  );
}
