import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

import "../styles/Booking.css";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("homefixUser")
  );

  const [service, setService] = useState(null);

  const [form, setForm] = useState({
    date: "",
    time: "",
    address: "",
    phone: ""
  });

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (
      !form.date ||
      !form.time ||
      !form.address ||
      !form.phone
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await api.post("/bookings", {
        userId: user.id,
        userName: user.name,
        serviceId: service.id,
        serviceName: service.name,
        price: service.price,
        date: form.date,
        time: form.time,
        address: form.address,
        phone: form.phone,
        status: "Pending"
      });

      alert("Booking successful.");

      navigate("/my-bookings");
    } catch (error) {
      console.log(error);
      alert("Booking failed.");
    }
  };

  if (!service) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <section className="booking-page">
      <div className="booking-card">
        <h1>Book Service</h1>

        <h2>{service.name}</h2>

        <p>Price: ₹{service.price}</p>

        <form onSubmit={handleSubmit}>
          <label>Date</label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <label>Time</label>

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
          />

          <label>Phone</label>

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
          />

          <label>Address</label>

          <textarea
            name="address"
            placeholder="Enter service address"
            value={form.address}
            onChange={handleChange}
          />

          <button type="submit">
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
}

export default Booking;