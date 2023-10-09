import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = ({ setAuthenticated, setUserRole }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://housing-db-85734cb1418b.herokuapp.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("id", data.id);

                    document.cookie = `access_token=${data.access_token}; path=/`;
                    console.log("Received token:", data.access_token);
                    console.log("Cookies:", document.cookie);

                    // setUserRole(data.role);
                    // setAuthenticated(true);

                    if (data.role === 'user') {
                        navigate(`/users/${data.id}`);
                    } else if (data.role === 'agent') {
                        navigate(`/agents/${data.id}`);
                    } else {
                        console.error("Invalid role");
                    }
                } else {
                    console.error("Invalid credentials");
                }
            } else {
                console.error("Authentication failed");
            }
        } catch (error) {
            console.error("Error occurred during sign in", error);
        }
    };

    return (
<div className="min-h-screen flex">
  {/* Left Side - Kwetu House Listings */}
  <div className="w-1/2 bg-black text-white flex flex-col items-center justify-center p-10">
    <h1 className="text-4xl font-extrabold mb-4">Kwetu House Listings</h1>
    <p className="text-lg text-center mb-8">
      Discover your dream home with our House Listing website, where unparalleled real estate opportunities await you. Whether you're searching for a cozy family home, a chic urban apartment, or a luxurious countryside estate, our platform offers an extensive range of meticulously curated properties to suit every lifestyle and budget. With user-friendly search tools and detailed property listings, finding the perfect house has never been easier. Explore diverse neighborhoods, visualize properties through immersive images, and connect with trusted real estate agents. Your new home is just a click away – start your journey towards homeownership today.
    </p>
  </div>
  {/* Right Side - Sign In Form */}
  <div className="w-1/2 flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-gray-600 text-center">
        Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
      </p>
    </div>
  </div>
</div>

    );
};

export default SignIn;
