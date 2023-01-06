import { createContext, useState, useContext, ReactElement, Dispatch, SetStateAction } from "react";
import { Pet } from "./types";

type ContextType = {
  adoptedPets: Pet[],
  setAdoptedPets: Dispatch<SetStateAction<Pet[]>>
}

const AdoptedPetContext = createContext<ContextType>({
  adoptedPets: [
    {
      id: 1,
      name: "Fide",
      animal: "dog",
      description: "Sarasa",
      breed: "Labrador",
      images: ["null"],
      city: "Seattle, WA",
      state: "WA",
    },
  ],
  setAdoptedPets: () => {},
});

export const AdoptedPetContextProvider = ({ children }: {children: ReactElement}) => {
  const [adoptedPets, setAdoptedPets] = useState<Pet[]>([]);
  return (
    <AdoptedPetContext.Provider value={{ adoptedPets, setAdoptedPets }}>
      {children}
    </AdoptedPetContext.Provider>
  );
};

export default function useAdoptedPets() {
  return useContext(AdoptedPetContext);
}
