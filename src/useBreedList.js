import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
  const [breedlist, setBreedlist] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedlist([]);
    } else if (localCache[animal]) {
      setBreedlist(localCache[animal]);
    } else {
      requestBreedlist();
    }

    async function requestBreedlist() {
      setBreedlist([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const data = await res.json();
      localCache[animal] = data.breeds || [];
      setBreedlist(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedlist, status];
}
