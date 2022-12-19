import { createContext, useState, useContext } from "react";

const AdoptedPetContext = createContext(null);

export const AdoptedPetContextProvider = ({ children }) => {
  const [adoptedPets, setAdoptedPets] = useState([]);
  return (
    <AdoptedPetContext.Provider value={{ adoptedPets, setAdoptedPets }}>
      {children}
    </AdoptedPetContext.Provider>
  );
};

export default function useAdoptedPets() {
  return useContext(AdoptedPetContext);
}
