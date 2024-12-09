"use client";

import { useState } from "react";

const ModificationsPage = () => {
  // State for storing existing modifications
  const [modifications, setModifications] = useState([
    { id: 1, name: "Catback Exhaust", cost: 500, date: "2024-01-10", description: "Improved exhaust flow and sound." },
    { id: 2, name: "Cold Air Intake", cost: 300, date: "2024-02-15", description: "Increased air intake efficiency." },
  ]);

  // State for the new modification form
  const [newMod, setNewMod] = useState({ name: "", cost: "", date: "", description: "" });

  // State for editing an existing modification
  const [editingMod, setEditingMod] = useState(null);

  // Handle input changes for both add and edit forms
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMod((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new modification to the list
  const handleAddModification = () => {
    setModifications([
      ...modifications,
      { ...newMod, id: modifications.length + 1, cost: parseFloat(newMod.cost) },
    ]);
    setNewMod({ name: "", cost: "", date: "", description: "" });
  };

  // Delete a modification by its ID
  const handleDeleteModification = (id) => {
    setModifications(modifications.filter((mod) => mod.id !== id));
  };

  // Start editing a modification
  const handleEditModification = (mod) => {
    setEditingMod(mod);
  };

  // Save changes to an edited modification
  const handleSaveModification = () => {
    setModifications(
      modifications.map((mod) =>
        mod.id === editingMod.id ? { ...editingMod, cost: parseFloat(editingMod.cost) } : mod
      )
    );
    setEditingMod(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white px-8 py-12">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Vehicle Modifications</h1>
        <p className="text-gray-400">Manage all modifications for your vehicle.</p>
      </header>

      {/* Summary Section */}
      <section className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
        <p className="text-gray-300">Total Modifications: {modifications.length}</p>
        <p className="text-gray-300">
          Total Cost: ${modifications.reduce((total, mod) => total + mod.cost, 0).toFixed(2)}
        </p>
      </section>

      {/* Modifications List */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Existing Modifications</h2>
        {modifications.length > 0 ? (
          <ul className="space-y-4">
            {modifications.map((mod) => (
              <li key={mod.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">{mod.name}</h3>
                <p className="text-gray-300">Cost: ${mod.cost.toFixed(2)}</p>
                <p className="text-gray-300">Date Installed: {mod.date}</p>
                <p className="text-gray-300">Description: {mod.description}</p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleEditModification(mod)}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteModification(mod.id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No modifications added yet.</p>
        )}
      </section>

      {/* Add/Edit Modification Form */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">
          {editingMod ? "Edit Modification" : "Add New Modification"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={editingMod ? editingMod.name : newMod.name}
            onChange={(e) =>
              editingMod
                ? setEditingMod({ ...editingMod, name: e.target.value })
                : handleInputChange(e)
            }
            placeholder="Modification Name"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <input
            type="number"
            name="cost"
            value={editingMod ? editingMod.cost : newMod.cost}
            onChange={(e) =>
              editingMod
                ? setEditingMod({ ...editingMod, cost: e.target.value })
                : handleInputChange(e)
            }
            placeholder="Cost"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <input
            type="date"
            name="date"
            value={editingMod ? editingMod.date : newMod.date}
            onChange={(e) =>
              editingMod
                ? setEditingMod({ ...editingMod, date: e.target.value })
                : handleInputChange(e)
            }
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <textarea
            name="description"
            value={editingMod ? editingMod.description : newMod.description}
            onChange={(e) =>
              editingMod
                ? setEditingMod({ ...editingMod, description: e.target.value })
                : handleInputChange(e)
            }
            placeholder="Description"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <button
            onClick={editingMod ? handleSaveModification : handleAddModification}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            {editingMod ? "Save Modification" : "Add Modification"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default ModificationsPage;
