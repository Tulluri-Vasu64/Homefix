import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/Admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const admin = JSON.parse(
    localStorage.getItem("homefixAdmin")
  );

  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [newService, setNewService] = useState({
    name: "",
    price: "",
    rating: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
      return;
    }

    loadData();
  }, [admin, navigate]);

  const loadData = async () => {
    try {
      const serviceResponse =
        await api.get("/services");

      const bookingResponse =
        await api.get("/bookings");

      setServices(serviceResponse.data);
      setBookings(bookingResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) {
      return;
    }

    try {
      await api.delete(`/services/${id}`);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const updateBooking = async (
    id,
    status
  ) => {
    try {
      await api.patch(
        `/bookings/${id}`,
        { status }
      );

      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNewService({
      ...newService,
      [e.target.name]: e.target.value
    });
  };

  const addService = async (e) => {
    e.preventDefault();

    try {
      await api.post("/services", {
        ...newService,
        price: Number(newService.price),
        rating: Number(newService.rating)
      });

      setNewService({
        name: "",
        price: "",
        rating: "",
        image: "",
        description: ""
      });

      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  if (!admin) {
    return null;
  }

  return (
    <section className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="admin-stats">
        <div>
          <h2>{services.length}</h2>
          <p>Services</p>
        </div>

        <div>
          <h2>{bookings.length}</h2>
          <p>Bookings</p>
        </div>
      </div>

      <div className="admin-section">
        <h2>Add Service</h2>

        <form
          className="admin-form"
          onSubmit={addService}
        >
          <input
            name="name"
            placeholder="Service Name"
            value={newService.name}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={newService.price}
            onChange={handleChange}
          />

          <input
            name="rating"
            type="number"
            step="0.1"
            placeholder="Rating"
            value={newService.rating}
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder="/images/service.jpg"
            value={newService.image}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={newService.description}
            onChange={handleChange}
          />

          <button type="submit">
            Add Service
          </button>
        </form>
      </div>

      <div className="admin-section">
        <h2>Manage Services</h2>

        <div className="admin-list">
          {services.map((service) => (
            <div
              className="admin-item"
              key={service.id}
            >
              <img
                src={service.image}
                alt={service.name}
              />

              <div>
                <h3>{service.name}</h3>
                <p>₹{service.price}</p>
              </div>

              <button
                onClick={() =>
                  deleteService(service.id)
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-section">
        <h2>Manage Bookings</h2>

        <div className="admin-list">
          {bookings.map((booking) => (
            <div
              className="admin-booking"
              key={booking.id}
            >
              <h3>{booking.serviceName}</h3>

              <p>
                Customer: {booking.userName}
              </p>

              <p>
                Date: {booking.date}
              </p>

              <p>
                Time: {booking.time}
              </p>

              <p>
                Status: {booking.status}
              </p>

              <button
                onClick={() =>
                  updateBooking(
                    booking.id,
                    "Confirmed"
                  )
                }
              >
                Confirm
              </button>

              <button
                onClick={() =>
                  updateBooking(
                    booking.id,
                    "Completed"
                  )
                }
              >
                Complete
              </button>

              <button
                onClick={() =>
                  updateBooking(
                    booking.id,
                    "Cancelled"
                  )
                }
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;