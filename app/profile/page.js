"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/vehicle-list-service";
import AddVehicleForm from "./AddVehicleForm";

export default function ProfilePage() {
  const { user } = useUserAuth(); // Access authenticated user
  const [vehicles, setVehicles] = useState([]); // State to store user's vehicles
  const [loading, setLoading] = useState(true); // Loading state for vehicles
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false); // Toggle for add vehicle form

  // Fetch vehicles when the user is available
  useEffect(() => {
    if (user) {
      const fetchVehicles = async () => {
        try {
          const fetchedVehicles = await getItems(user.uid);
          setVehicles(fetchedVehicles);
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchVehicles();
    }
  }, [user]);

  // Handle adding a new vehicle
  const handleAddVehicle = async (vehicleData) => {
    if (!user || !user.uid) {
      console.error("User is not authenticated or user UID is missing.");
      return;
    }

    try {
      const newVehicleId = await addItem(user.uid, vehicleData);
      setVehicles((prev) => [...prev, { id: newVehicleId, ...vehicleData }]); // Update state with new vehicle
      setShowAddVehicleForm(false); // Hide form after adding
    } catch (error) {
      console.error("Error adding vehicle: ", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white px-8 py-12">
      {/* Hero Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Your Profile</h1>
        <p className="text-lg text-gray-400">
          {user ? `Welcome, ${user.displayName}` : "Loading..."}
        </p>
      </header>

      {/* User Info Section */}
      <section className="mb-12">
        {user && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Account Info</h2>
            <p className="text-gray-300">Email: {user.email}</p>
            <p className="text-gray-300">UID: {user.uid}</p>
          </div>
        )}
      </section>

      {/* Add Vehicle Section */}
      <section className="mb-12">
        <button
          onClick={() => setShowAddVehicleForm(!showAddVehicleForm)}
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white"
        >
          {showAddVehicleForm ? "Cancel" : "Add New Vehicle"}
        </button>

        {showAddVehicleForm && (
          <div className="mt-8">
            <AddVehicleForm onAddVehicle={handleAddVehicle} />
          </div>
        )}
      </section>

      {/* Vehicle List Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Your Vehicles</h2>
        {loading ? (
          <p className="text-gray-400">Loading your vehicles...</p>
        ) : vehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                <p className="text-gray-300">
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </p>
                <p className="text-gray-400 mt-2">{vehicle.description}</p>
                <div className="mt-4 flex justify-between">
                  <button className="bg-yellow-500 hover:bg-yellow-600 transition px-4 py-2 rounded-lg text-black">
                    Edit
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg text-white">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No vehicles found. Add your first one!</p>
        )}
      </section>
    </main>
  );
}
