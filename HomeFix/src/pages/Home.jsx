import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

import "../styles/Home.css";

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api
      .get("/services")
      .then((response) => {
        setServices(response.data.slice(0, 6));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Home Maintenance Made Easy</h1>

          <p>
            Professional home maintenance services at your
            doorstep.
          </p>

          <Link to="/services" className="hero-btn">
            Explore Services
          </Link>
        </div>
      </section>

      <section className="home-services">
        <h2>Our Services</h2>

        <div className="home-service-grid">
          {services.map((service) => (
            <div className="home-service-card" key={service.id}>
              <img
                src={service.image}
                alt={service.name}
                className="service-image"
              />

              <div className="card-content">
                <h3>{service.name}</h3>

                <p>Starting from ₹{service.price}</p>

                <p>⭐ {service.rating}</p>

                <Link
                  to={`/service/${service.id}`}
                  className="view-btn"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;