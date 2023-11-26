import { ReactNode, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../store/user.store";

export const AuthContext = createContext({});

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider(props: AuthContextProviderProps) {
  const { children } = props;
  const { user } = userStore((state) => state);
  const navigator = useNavigate();

  useEffect(() => {
    if (!user) navigator("/");
  }, [user, navigator]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
