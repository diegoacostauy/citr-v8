import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

function Details() {
  const [show, setShow] = useState(false);
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

  const pet = data.pets[0] ?? {};

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button onClick={() => setShow(true)}>Adopt {pet.name}</button>
        <p className="description">{pet.description}</p>
      </div>
      {show && (
        <Modal>
          <h1>Would you like to adopt {pet.name}</h1>
          <div className="buttons">
            <button>Yes</button>
            <button onClick={() => setShow(false)}>No</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}
