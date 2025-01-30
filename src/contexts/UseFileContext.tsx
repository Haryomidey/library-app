import React, { createContext, useContext, useState } from "react";

interface FileContextType {
  fileUrl: string | null;
  fileType: string | null;
  pageNum: number;
  setFileContent: (file: { fileUrl: string; fileType: string; pageNum: number }) => void;
  error: string | null;
  isLoading: boolean;
  setError: (error: string) => void;
  setLoading: (isLoading: boolean) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
};

interface FileProviderProps {
  children: React.ReactNode;
}

export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [pageNum, setPageNum] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setFileContent = ({ fileUrl, fileType, pageNum }: { fileUrl: string; fileType: string; pageNum: number }) => {
    setFileUrl(fileUrl);
    setFileType(fileType);
    setPageNum(pageNum);
  };

  return (
    <FileContext.Provider
      value={{
        fileUrl,
        fileType,
        pageNum,
        setFileContent,
        error,
        isLoading,
        setError,
        setLoading: setIsLoading,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
