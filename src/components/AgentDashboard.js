import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function AgentDashboard() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/agents/${id}`) 
      .then((response) => response.json())
      .then((data) => {
        setAgent(data);
      })
      .catch((error) => {
        console.error("Error fetching agent details:", error);
      });
  }, [id]);

  const handleLogout = () => {
    // clears storgae 
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/signin"); 
  };


  if (!agent) {
    return <div>Loading...</div>;
  }

  return (
<div className="agent-dashboard bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
  <div className="dashboard-links mb-6">
    <Link to="/home" className="text-blue-500 hover:underline mr-4">Home</Link>
    <Link to="/createhouse" className="text-blue-500 hover:underline mr-4">Create House</Link>
    <Link to="/updatehouse" className="text-blue-500 hover:underline mr-4">Update House</Link>
    <Link to="/deletehouse" className="text-blue-500 hover:underline mr-4">Delete House</Link>
    <Link to={`/agents/${id}`} className="text-blue-500 hover:underline mr-4">Agent Dashboard</Link>
    <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
  </div>
  <div className="bg-white p-8 rounded shadow-md w-96">
    <h2 className="text-2xl font-semibold mb-4">Agent Details</h2>
    <p className="text-gray-600 mb-2">Name: {agent.name}</p>
    <p className="text-gray-600 mb-2">Email: {agent.email}</p>
    <p className="text-gray-600 mb-4">Phone Number: {agent.phonebook}</p>
    {/* Links to other pages */}
    {/* Display other agent details as needed */}
  </div>
</div>
  );
}

export default AgentDashboard;
