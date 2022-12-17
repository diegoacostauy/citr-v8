import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./fetcher";

export default function Details() {
  const { id } = useParams();
  const url = `http://pets-v2.dev-apis.com/pets?id=${id}`;
  const { isLoading, data } = useQuery({
    queryKey: ["detail", id],
    queryFn: () => fetcher(url),
  });

  if (isLoading)
    return (
      <div className="loading-pane">
        <div className="loader">🌀</div>
      </div>
    );

  const pet = data.pets[0];

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button>Adopt {pet.name}</button>
        <p className="description">{pet.description}</p>
      </div>
    </div>
  );
}
