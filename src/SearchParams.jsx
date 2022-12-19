import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import useAdoptedPets from "./AdoptedPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

export default function SearchParams() {
  const { adoptedPets } = useAdoptedPets();
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const { data } = useQuery({
    queryKey: ["search", requestParams],
    queryFn: () =>
      fetcher(
        `http://pets-v2.dev-apis.com/pets?animal=${requestParams.animal}&location=${requestParams.location}&breed=${requestParams.breed}`
      ),
  });
  const pets = data?.pets ?? [];

  const handleSubmit = (ev) => {
    const formData = new FormData(ev.target);
    setRequestParams({
      location: formData.get("location") ?? "",
      animal: formData.get("animal") ?? "",
      breed: formData.get("breed") ?? "",
    });
    ev.preventDefault();
  };

  return (
    <div className="search-params">
      <form action="" onSubmit={handleSubmit}>
        {adoptedPets.length}
        <label htmlFor="location">
          Location
          <input type="text" id="location" name="location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            onChange={(ev) => setAnimal(ev.target.value)}
          >
            <option />
            {ANIMALS.map((a) => (
              <option value={a} key={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select name="breed" id="breed" disabled={breeds.length == 0}>
            <option />
            {breeds &&
              breeds.map((a) => (
                <option value={a} key={a}>
                  {a}
                </option>
              ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
}
