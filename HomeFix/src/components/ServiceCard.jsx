import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <div className="home-service-card">
      <img
        src={service.image}
        alt={service.name}
        className="service-image"
      />

      <div className="card-content">
        <h3>{service.name}</h3>

        <p>{service.description}</p>

        <p>
          <strong>₹{service.price}</strong>
        </p>

        <p>⭐ {service.rating}</p>

        <Link
          to={`/service/${service.id}`}
          className="view-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;