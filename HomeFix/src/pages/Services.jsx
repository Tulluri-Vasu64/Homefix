import { useEffect, useState } from "react";

import api from "../services/api";
import ServiceCard from "../components/ServiceCard";

import "../styles/Services.css";

function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/services")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredServices = services.filter((service) =>
    service.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="services-page">
      <h1>Our Home Services</h1>

      <input
        type="text"
        placeholder="Search services..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="services-grid">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
          />
        ))}
      </div>
    </section>
  );
}

export default Services;