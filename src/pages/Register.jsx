import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      return Swal.fire({
        icon: "warning",
        title: "Please agree to the terms and conditions.",
      });
    }

    try {
      const res = await fetch("http://192.168.1.57:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Redirecting to dashboard...",
          timer: 1500,
          showConfirmButton: false,
        });

        localStorage.setItem("isAuthenticated", "true");
        setTimeout(() => navigate("/dashboard"), 1600);
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message || "An error occurred. Please try again.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not connect to the server.",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Illustration */}
        <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-10">
        <img
          src={require("../assets/images/girl-with-laptop-light.png")} // use your own image
          alt="Illustration"
          className="max-w-md"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-6 sm:px-12 lg:px-24">
        <h2 className="text-2xl font-semibold mb-2">Adventure starts here 🚀</h2>
        <p className="text-gray-500 mb-6">Make your app management easy and fun!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="accent-indigo-500"
              required
            />
            <label className="text-sm text-gray-600">
              I agree to <a href="#" className="text-indigo-600">privacy policy & terms</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 hover:underline">Sign in instead</Link>
        </p>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t" />
          <span className="mx-4 text-gray-400">or</span>
          <hr className="flex-grow border-t" />
        </div>

        <div className="flex justify-center gap-4">
          <img src="/icons/facebook.svg" alt="facebook" className="w-5" />
          <img src="/icons/github.svg" alt="github" className="w-5" />
          <img src="/icons/google.svg" alt="google" className="w-5" />
        </div>
      </div>
    </div>
  );
};

export default Register;
