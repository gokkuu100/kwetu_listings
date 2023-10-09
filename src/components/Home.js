import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    // Fetch houses data from API endpoint
    fetch("http://127.0.0.1:5000/houses") // Update the API endpoint URL
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHouses(data);
        } else {
          throw new Error("Invalid data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
<div className="home p-4">
  <h1 className="text-3xl font-semibold mb-8 text-center">House Listings</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {houses.map((house) => (
      <Link key={house.id} to={`/house/${house.id}`} className="house-card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-2">{house.title}</h2>
        <p className="text-gray-600 mb-2">Price: Ksh {house.price}</p>
        <p className="text-gray-600 mb-2">Size: {house.size} sqft</p>
        <p className="text-gray-600 mb-2">County: {house.county}</p>
        <img src={house.image_paths} alt={house.title} className="w-full h-36 object-cover mb-4 rounded-md" />
      </Link>
    ))}
  </div>
</div>
  );
}

export default Home;
