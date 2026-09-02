import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../services/api";

import "../styles/ServiceDetails.css";

function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);

  useEffect(() => {
    api
      .get(`/services/${id}`)
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!service) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <section className="details-page">
      <div className="details-card">
        <img
          src={service.image}
          alt={service.name}
        />

        <div className="details-content">
          <h1>{service.name}</h1>

          <p>
            <strong>Price:</strong> ₹{service.price}
          </p>

          <p>
            <strong>Rating:</strong> ⭐ {service.rating}
          </p>

          <p>
            <strong>Description:</strong>
          </p>

          <p>{service.description}</p>

          <Link
            to={`/booking/${service.id}`}
            className="book-btn"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServiceDetails;