
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("homefixUser")
  );

  const admin = JSON.parse(
    localStorage.getItem("homefixAdmin")
  );

  // USER LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("homefixUser");

    navigate("/login");
  };

  // ADMIN LOGOUT
  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("homefixAdmin");

    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <Link to="/" className="logo">
        HomeFix
      </Link>

      <div className="nav-links">

        {/* COMMON LINKS */}
        <Link to="/">
          Home
        </Link>

        <Link to="/services">
          Services
        </Link>

        <Link to="/about">
          About
        </Link>
        <Link to="/my-bookings">
              My Bookings
            </Link>
            <Link to="/login">
              Login
            </Link>
            

        {/* ================= USER LOGGED IN ================= */}

        {user && !admin && (
          <>
           

            <Link to="/profile">
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}


        {/* ================= ADMIN LOGGED IN ================= */}

        {admin && (
          <>
            <Link to="/admin/dashboard">
              Dashboard
            </Link>
            

            <button
              onClick={handleAdminLogout}
              className="logout-btn"
            >
              Admin Logout
            </button>
          </>
        )}


        {/* ================= NOT LOGGED IN ================= */}

        {!user && !admin && (
          <>
           
{/* 
            <Link to="/register">
              Register
            </Link> */}

           
            
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;

