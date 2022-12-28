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
    <div className="my-0 mx-auto w-11/12">
      <form
        action=""
        onSubmit={handleSubmit}
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
      >
        {adoptedPets.length}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            className="mb-5 block w-60"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            className="mb-5 block w-60"
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
          <select
            name="breed"
            id="breed"
            disabled={breeds.length == 0}
            className="mb-5 block w-60"
          >
            <option />
            {breeds &&
              breeds.map((a) => (
                <option value={a} key={a}>
                  {a}
                </option>
              ))}
          </select>
        </label>
        <button className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-60">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
}
