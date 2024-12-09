const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin SDK with service account credentials
admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
});

const db = admin.firestore();

// Read vehicle data from a JSON file
const vehicleData = JSON.parse(fs.readFileSync("sample_vehicle_data.json", "utf8"));

// Function to import vehicle data into Firestore
async function importData() {
  try {
    const batch = db.batch(); // Use batch writes for efficiency
    const vehiclesCollection = db.collection("vehicles"); // Reference to the 'vehicles' collection

    // Add each vehicle to the batch
    vehicleData.forEach((vehicle) => {
      const docRef = vehiclesCollection.doc(); // Auto-generate document ID
      batch.set(docRef, vehicle); // Add vehicle data to the batch
    });

    await batch.commit(); // Commit the batch to Firestore
    console.log("Data imported successfully!");
  } catch (error) {
    console.error("Error importing data:", error); // Log any errors that occur
  }
}

// Execute the import function
importData();
