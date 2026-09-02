
import { useEffect, useState } from "react";

import api from "../services/api";

function MyBookings() {
  const user = JSON.parse(
    localStorage.getItem("homefixUser")
  );

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;

    api
      .get(`/bookings?userId=${user.id}`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Delete Booking
  const handleDelete = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/bookings/${bookingId}`);

      // Remove deleted booking from page
      setBookings((prevBookings) =>
        prevBookings.filter(
          (booking) => booking.id !== bookingId
        )
      );

      alert("Booking deleted successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to delete booking.");
    }
  };

  if (!user) {
    return (
      <div className="simple-page">
        <h2>Please login to view bookings.</h2>
      </div>
    );
  }

  return (
    <section className="services-page">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div
              className="booking-item"
              key={booking.id}
            >
              <h2>{booking.serviceName}</h2>

              <p>
                Price: ₹{booking.price}
              </p>

              <p>
                Date: {booking.date}
              </p>

              <p>
                Time: {booking.time}
              </p>

              <p>
                Address: {booking.address}
              </p>

              <p>
                Status:
                <strong> {booking.status}</strong>
              </p>

              {/* Delete Button */}
              <button
                className="delete-booking-btn"
                onClick={() =>
                  handleDelete(booking.id)
                }
              >
                Delete Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyBookings;
