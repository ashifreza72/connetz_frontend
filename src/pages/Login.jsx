import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import logo from "../assets/images/connetz-logo-red.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use a fallback URL if environment variable is not set
      const baseUrl = process.env.REACT_APP_BASE_API || 'http://192.168.1.57:8000';
      const res = await fetch(`${baseUrl}/api/login`, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
   
      if (res.ok) {
        // Save data in localStorage
        localStorage.setItem("token", data.token);               
        localStorage.setItem("XF-session-token", data.session.session_token);  
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("user_id", data.session.user_id);           
        localStorage.setItem("user_type", data.user_type);       

        // Update auth context
        login(data.user);

  Swal.fire({
    icon: "success",
    title: "Login Successful",
    text: "Redirecting to dashboard...",
     customClass: {
    confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
  },
    timer: 1500,
    showConfirmButton: false,
  });

        // Navigate after a short delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1600);
      } else {
        switch (res.status) {
          case 401:
            Swal.fire({
              icon: "error",
              title: "Unauthorized",
              text: data.message || "Invalid email or password.",
              customClass: {
              confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
        },
            });
            break;
          case 404:
            Swal.fire({
              icon: "error",
              title: "Not Found",
              text: "Login endpoint not found (404). Please contact support.",
              customClass: {
              confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
            },
            });
            break;
          case 500:
            Swal.fire({
              icon: "error",
              title: "Server Error",
              text: "Internal server error (500). Please try again later.",
              customClass: {
              confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
            },
            });
            break;
          default:
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: data.message || "An unknown error occurred.",
              customClass: {
              confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
            },
            });
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not connect to the server. Please try again later.",
        customClass: {
              confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
            },
      });
    }
  };


  return (
  <div className="min-h-screen flex flex-col md:flex-row">
    {/* Image Section - Hidden on mobile */}
    <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-10">
      <img
        src={require("../assets/images/boy-with-rocket-light.png")}
        alt="Illustration"
        className="max-w-md"
      />
    </div>

    {/* Login Form Section - Full width on mobile */}
    <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10 bg-white">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        <h2 className="text-2xl flex justify-center font-semibold mb-1 text-gray-800">
    Welcome! 👋
  </h2>
  <p className="mb-6 justify-center flex text-gray-500">Please sign-in to your account!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-sans text-gray-700 block mb-1">
              Email or Username
            </label>
            <input
              type="email"
              placeholder="Enter your email or username"
              className="w-full border text-sm border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-sans text-gray-700 block mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <a
              href="/forgot-password"
              className="text-indigo-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full text-sm font-semibold bg-indigo-500 text-white py-2.5 rounded-lg shadow-[0_4px_12px_rgba(115,103,240,0.5)]"
          >
            Sign in
          </button>
        </form>

        <div className="text-center text-gray-400 mt-48">
          <span>© 2025, made with connetz</span>
        </div>
      </div>
    </div>
  </div>
);

};

export default Login;
