import Pet from "./Pet";

export default function Results({ pets }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {pets.length ? (
        pets.map((pet) => (
          <Pet
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
