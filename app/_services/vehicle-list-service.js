/**
 * Firestore Utility Functions for Vehicle Management
 * 
 * Provides methods to retrieve and add vehicle data for a specific user.
 */

import { db } from "../_utils/firebase"; // Firestore initialization
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

const userId = "T1y4JfuMV8dmjVTVWJH7OYqKmDn1"; // Test User ID

// Retrieve all vehicles for a specific user
export const getItems = async (userId) => {
  const vehicles = [];
  const q = query(collection(db, "vehicles"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => vehicles.push({ id: doc.id, ...doc.data() }));
  return vehicles;
};

console.log("User UID:", userId);

// Add a new vehicle for a user
export const addItem = async (userId, vehicleData) => {
  try {
    const newVehicleRef = await addDoc(collection(db, "vehicles"), {
      userId,
      ...vehicleData,
    });
    console.log("Vehicle added with ID:", newVehicleRef.id);
    return newVehicleRef.id;
  } catch (error) {
    console.error("Error adding vehicle:", error);
    throw error;
  }
};
