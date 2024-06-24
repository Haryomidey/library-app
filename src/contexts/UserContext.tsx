import { createContext, ReactNode, useContext, useState } from "react";

interface ContextType {
  searchParams: string;
  setSearchParams: React.Dispatch<React.SetStateAction<string>>;
}


export const Context = createContext<ContextType | null>(null);

export const ContextWrapper = ({ children }: { children: ReactNode }) => {

  const [searchParams, setSearchParams] = useState<string>('')

  return (
    <Context.Provider value={{ searchParams, setSearchParams }}>
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
