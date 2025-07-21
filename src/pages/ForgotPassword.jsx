import { useState } from "react";
import Swal from "sweetalert2";
import logo from "../assets/images/connetz-logo-red.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://192.168.1.57:8000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message || "Password reset link sent to your email.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Email not found or something went wrong.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please try again later.",
      });
    }
  };

  return (
    // <div className="flex justify-center items-center min-h-screen bg-gray-50">
    //   <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
    //     <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <input
    //         type="email"
    //         placeholder="Enter your email"
    //         className="w-full border px-3 py-2 rounded"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //       <button
    //         type="submit"
    //         className="w-full bg-indigo-600 text-white py-2 rounded"
    //       >
    //         Send Reset Link
    //       </button>
    //     </form>
    //   </div>
    // </div>


    <div className="min-h-screen flex">
        <div className="w-full md:w-1/1 flex bg-gray-100 items-center justify-center p-10">
        <img
          src={require("../assets/images/boy-with-rocket-light.png")} // use your own image
          alt="Illustration"
          className="max-w-md"
        />
      </div>

      {/* Right Login Form */}
      <div className=" hidden md:flex w-1/2 items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-md">
          
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Logo" className="h-10" />
          </div>

          <h2 className="text-2xl font-semibold mb-1 text-gray-600">
           Forgot Password? 🔒
          </h2>
          <p className=" text-sm mb-6 text-gray-500">
           Enter your email and we'll send you instructions to reset your password 
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
           <input
            type="email"
            placeholder="Enter your email"
            className="w-full border text-sm font-sans px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
           
          
<button
  type="submit"
  className="w-full text-sm font-semibold bg-indigo-500 text-white py-2.5 rounded-lg shadow-[0_4px_12px_rgba(115,103,240,0.5)]"
>
  Send Reset Link
</button>


        </form>

          <div className="text-center  text-gray-400 mt-72">
        <span>© 2025 , made with connetz</span>
      </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
