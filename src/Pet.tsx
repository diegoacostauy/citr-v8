import { Link } from "react-router-dom";
import { Pet } from "./types";

interface PetProps extends Omit<Pet, 'description' | 'city' | 'state'> {
  location: string
};

export default function Pet({ name, animal, breed, images, location, id}: PetProps ) {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }
  return (
    <Link to={`details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location} `}</h2>
      </div>
    </Link>
  );
}
