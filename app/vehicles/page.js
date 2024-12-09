"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../_utils/firebase";

export default function VehiclesPage() {
  const { user } = useUserAuth(); // Access authenticated user
  const [builds, setBuilds] = useState([]); // State for storing all vehicle builds
  const [newBuild, setNewBuild] = useState({
    name: "",
    make: "",
    model: "",
    year: "",
    description: "",
  }); // State for the new build form
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [showForm, setShowForm] = useState(false); // Toggle for the add build form
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all builds on component mount
  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const buildsRef = collection(db, "vehicles");
        const snapshot = await getDocs(buildsRef);
        const fetchedBuilds = [];
        snapshot.forEach((doc) => {
          fetchedBuilds.push({ id: doc.id, ...doc.data() });
        });
        setBuilds(fetchedBuilds); // Populate builds state with fetched data
      } catch (error) {
        console.error("Error fetching builds:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchBuilds();
  }, []);

  // Handle changes in the add build form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBuild((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new build to the database and update local state
  const handleAddBuild = async () => {
    try {
      const newBuildWithOwner = {
        ...newBuild,
        ownerId: user?.uid || "unknown",
        year: parseInt(newBuild.year, 10),
      };

      const docRef = await addDoc(collection(db, "vehicles"), newBuildWithOwner);
      setBuilds([...builds, { id: docRef.id, ...newBuildWithOwner }]); // Append new build to the list
      setNewBuild({
        name: "",
        make: "",
        model: "",
        year: "",
        description: "",
        image: "",
      }); // Reset form
      setShowForm(false); // Hide form after adding
    } catch (error) {
      console.error("Error adding build:", error);
    }
  };

  // Filter builds based on the search term
  const filteredBuilds = builds.filter((build) =>
    [build.name, build.make, build.model]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-8 py-12">
      {/* Hero Section */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Vehicle Builds Gallery
        </h1>
        <p className="text-gray-400 mt-4">
          Discover and showcase amazing vehicle builds in a fully immersive dark mode.
        </p>
      </header>

      {/* Search and Add Build Controls */}
      <div className="flex items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search builds"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white"
        >
          {showForm ? "Cancel" : "Add Build"}
        </button>
      </div>

      {/* Add Build Form */}
      {showForm && (
        <section className="mb-12 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Add Your Build</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newBuild.name}
              onChange={handleInputChange}
              placeholder="Build Name"
              className="p-3 bg-gray-700 text-white rounded-lg"
            />
            <input
              type="text"
              name="make"
              value={newBuild.make}
              onChange={handleInputChange}
              placeholder="Make (e.g., Subaru)"
              className="p-3 bg-gray-700 text-white rounded-lg"
            />
            <input
              type="text"
              name="model"
              value={newBuild.model}
              onChange={handleInputChange}
              placeholder="Model (e.g., WRX)"
              className="p-3 bg-gray-700 text-white rounded-lg"
            />
            <input
              type="number"
              name="year"
              value={newBuild.year}
              onChange={handleInputChange}
              placeholder="Year (e.g., 2002)"
              className="p-3 bg-gray-700 text-white rounded-lg"
            />
          </div>
          <textarea
            name="description"
            value={newBuild.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="mt-4 p-3 bg-gray-700 text-white rounded-lg w-full"
          />
          <button
            onClick={handleAddBuild}
            className="mt-4 bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-lg text-white"
          >
            Add Build
          </button>
        </section>
      )}

      {/* Display Builds */}
      <section>
        <h2 className="text-3xl font-bold mb-4">All Builds</h2>
        {loading ? (
          <p className="text-gray-400">Loading builds...</p>
        ) : filteredBuilds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuilds.map((build) => (
              <div
                key={build.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105"
              >
                <h3 className="text-xl font-bold text-blue-400">{build.name}</h3>
                <p className="text-gray-300">
                  {build.make} {build.model} ({build.year})
                </p>
                <p className="text-gray-400 mt-2">{build.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No builds match your search.</p>
        )}
      </section>
    </main>
  );
}
