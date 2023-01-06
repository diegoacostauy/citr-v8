import PetComponent from "./Pet";
import { Pet } from "./types";

type PetProps = Omit<Pet, 'description'>;

export default function Results({ pets }: { pets: PetProps[]}) {
  return (
    <div className="search">
      {pets.length ? (
        pets.map((pet) => (
          <PetComponent
            name={pet.name}
            breed={pet.breed}
            animal={pet.animal}
            images={pet.images}
            location={`${pet.city} ${pet.state}`}
            id={pet.id}
            key={pet.id}
          />
        ))
      ) : (
        <h1>No Pets found!</h1>
      )}
    </div>
  );
}
