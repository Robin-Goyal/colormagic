import { createContext, useContext, useState } from "react";
export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IState {
  selectedBreed: string;
  page: number;
  cats: Cat[];
  setCats: (cats: Cat[]) => void;
  setPage: (page: number) => void;
  setSelectedBreed: (selectedBreed: string) => void;
}

export const CatContext = createContext<IState | null>(null);

const CatProvider = (props: any) => {
  const [cats, setCats] = useState<Cat[] | null>(null);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [page, setPage] = useState(1);

  return (
    <CatContext.Provider
      value={{
        selectedBreed,
        page,
        cats,
        setCats: async (u) => {
          setCats(u);
        },
        setSelectedBreed: async (u) => {
          setSelectedBreed(u);
        },
        setPage: async (u) => {
          setPage(u);
        },
      }}
      {...props}
    />
  );
};
export default CatProvider;

export function useCats() {
  return useContext(CatContext);
}
