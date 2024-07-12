import React, { createContext, ReactNode, useContext, useState } from "react";

interface ContextType {
  searchParams: string;
  setSearchParams: React.Dispatch<React.SetStateAction<string>>;
  isAdminSearchBarOpen: boolean;
  setAdminSearchBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export const Context = createContext<ContextType | null>(null);

export const ContextWrapper = ({ children }: { children: ReactNode }) => {

  const [searchParams, setSearchParams] = useState('');
  const [isAdminSearchBarOpen, setAdminSearchBarOpen] = useState<boolean>(false);


  return (
    <Context.Provider value={{ searchParams, setSearchParams, isAdminSearchBarOpen, setAdminSearchBarOpen }}>
      {children}
    </Context.Provider>
  );
}

export const useUserContext = () => useContext(Context) as ContextType
