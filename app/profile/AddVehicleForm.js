"use client";

import { useState } from "react";

const AddVehicleForm = ({ onAddVehicle }) => {
  // State for form data
  const [vehicleData, setVehicleData] = useState({
    name: "",
    make: "",
    model: "",
    year: "",
    description: "",
  });

  // Update form data when input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };

  // Submit form data to parent and reset the form
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddVehicle(vehicleData); // Call parent function with form data
    setVehicleData({
      name: "",
      make: "",
      model: "",
      year: "",
      description: "",
    }); // Reset form fields
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Add a New Vehicle</h3>

      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={vehicleData.name}
          onChange={handleChange}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
          required
        />
      </div>

      {/* Make Input */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Make</label>
        <input
          type="text"
          name="make"
          value={vehicleData.make}
          onChange={handleChange}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
          required
        />
      </div>

      {/* Model Input */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Model</label>
        <input
          type="text"
          name="model"
          value={vehicleData.model}
          onChange={handleChange}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
          required
        />
      </div>

      {/* Year Input */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Year</label>
        <input
          type="number"
          name="year"
          value={vehicleData.year}
          onChange={handleChange}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
          required
        />
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={vehicleData.description}
          onChange={handleChange}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg">
        Add Vehicle
      </button>
    </form>
  );
};

export default AddVehicleForm;
