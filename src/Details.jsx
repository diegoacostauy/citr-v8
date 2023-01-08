import { useState } from "react";
import { useDispatch } from "react-redux";
import { adopt } from "./redux/AdoptedPetsSlice";
import { useParams, useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import { useGetPetQuery } from "./redux/petApiService";

function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const { isLoading, data: pet } = useGetPetQuery(id);

  if (isLoading)
    return (
      <div className="loading-pane">
        <div className="loader">🌀</div>
      </div>
    );

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
            <button
              onClick={() => {
                dispatch(adopt(pet));
                navigate("/");
              }}
            >
              Yes
            </button>
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
