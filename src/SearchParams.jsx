import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { all } from "./redux/SearchParamsSlice";
import { useSearchQuery } from "./redux/petApiService";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

export default function SearchParams() {
  const adoptedPets = useSelector(state => state.adoptedPets.value);
  const searchParams = useSelector(state => state.searchParams.value);
  const dispatch = useDispatch();
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const { data: pets = [] } = useSearchQuery(searchParams);

  const handleSubmit = (ev) => {
    const formData = new FormData(ev.target);
    dispatch(all({
      location: formData.get("location") ?? "",
      animal: formData.get("animal") ?? "",
      breed: formData.get("breed") ?? "",
    }));
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
