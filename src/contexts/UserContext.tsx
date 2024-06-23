import Cookies from "js-cookie";
import { createContext, ReactNode, useContext } from "react";


type MyContextProps = {
  token: string;
}

export const Context = createContext<MyContextProps | null>(null);

export const ContextWrapper = ({ children }: { children: ReactNode }) => {

    const token = Cookies.get('token')?.toString() || '';

    const getAuthToken = (): string | null => {
      const token = sessionStorage.getItem("token")?.toString();
       if (token) {
        return token;
      }
      return "";
    };

    getAuthToken()

    return (
        <Context.Provider value={{ token }}>
            {children}
        </Context.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useUserContext must be used within a ContextWrapper');
    }
    return context;
  }
