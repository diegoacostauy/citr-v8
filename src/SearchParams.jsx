import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

export default function SearchParams() {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds, status] = useBreedList(animal);

  useEffect(() => {
    fetchPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPets = async () => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const data = await res.json();
    setPets(data.pets);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetchPets();
  };

  return (
    <div className="search-params">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="location">
          Location
          <input
            type="text"
            value={location}
            id="location"
            name="location"
            onChange={(ev) => setLocation(ev.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            onChange={(ev) => {
              setAnimal(ev.target.value);
              setBreed("");
            }}
            value={animal}
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
            onChange={(ev) => setBreed(ev.target.value)}
            value={breed}
          >
            <option />
            {breeds.map((a) => (
              <option value={a} key={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets}/>
    </div>
  );
}
