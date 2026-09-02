
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";



// import "../styles/AdminRegister.css";

// function AdminRegister() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [message, setMessage] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     setMessage("");

//     // Check empty fields
//     if (
//       !name ||
//       !email ||
//       !password ||
//       !confirmPassword
//     ) {
//       setMessage("Please fill all fields.");
//       return;
//     }

//     // Check password
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }

//     // Password length
//     if (password.length < 6) {
//       setMessage(
//         "Password must be at least 6 characters."
//       );
//       return;
//     }

//     try {
//       // Check whether admin already exists
//       const response = await api.get(
//         `/admins?email=${email}`
//       );

//       if (response.data.length > 0) {
//         setMessage("Admin email already exists.");
//         return;
//       }

//       // Create new admin
//       const newAdmin = {
//         name: name,
//         email: email,
//         password: password,
//         role: "admin"
//       };

//       await api.post("/admins", newAdmin);

//       setMessage(
//         "Admin registration successful!"
//       );

//       // Clear form
//       setName("");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");

//       // Go to Admin Login
//       setTimeout(() => {
//         navigate("/admin/login");
//       }, 1000);

//     } catch (error) {
//       console.log(error);
//       setMessage(
//         "Registration failed. Start JSON Server."
//       );
//     }
//   };

//   return (
//     <section className="admin-register-page">

//       <div className="admin-register-card">

//         <h1>Admin Registration</h1>

//         <p className="admin-register-subtitle">
//           Create your HomeFix admin account
//         </p>

//         <form onSubmit={handleRegister}>

//           {/* NAME */}

//           <div className="admin-form-group">

//             <label>Admin Name</label>

//             <input
//               type="text"
//               placeholder="Enter admin name"
//               value={name}
//               onChange={(e) =>
//                 setName(e.target.value)
//               }
//             />

//           </div>


//           {/* EMAIL */}

//           <div className="admin-form-group">

//             <label>Email</label>

//             <input
//               type="email"
//               placeholder="Enter admin email"
//               value={email}
//               onChange={(e) =>
//                 setEmail(e.target.value)
//               }
//             />

//           </div>


//           {/* PASSWORD */}

//           <div className="admin-form-group">

//             <label>Password</label>

//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) =>
//                 setPassword(e.target.value)
//               }
//             />

//           </div>


//           {/* CONFIRM PASSWORD */}

//           <div className="admin-form-group">

//             <label>Confirm Password</label>

//             <input
//               type="password"
//               placeholder="Confirm password"
//               value={confirmPassword}
//               onChange={(e) =>
//                 setConfirmPassword(
//                   e.target.value
//                 )
//               }
//             />

//           </div>


//           {/* REGISTER BUTTON */}

//           <button
//             type="submit"
//             className="admin-register-button"
//           >
//             Register Admin
//           </button>

//         </form>


//         {/* MESSAGE */}

//         {message && (
//           <p className="admin-register-message">
//             {message}
//           </p>
//         )}


//         {/* ADMIN LOGIN */}

//         <p className="admin-login-link">

//           Already have an admin account?

//           <Link to="/admin/login">
//             Admin Login
//           </Link>

//         </p>

//       </div>

//     </section>
//   );
// }

// export default AdminRegister;

