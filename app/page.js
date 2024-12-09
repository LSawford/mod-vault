"use client";

import { useUserAuth } from "./_utils/auth-context"; // Auth context for user state and login/logout methods
import { useState } from "react";
import Link from "next/link"; // Link for navigation
import { motion } from "framer-motion"; // Animation library

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth(); // Access user state and methods
  const [loading, setLoading] = useState(false); // State for login loading indicator

  // Handle user sign-in
  const handleSignIn = async () => {
    setLoading(true);
    try {
      await gitHubSignIn(); // Initiate GitHub login
    } catch (error) {
      console.error("Error signing in: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle user sign-out
  const handleSignOut = async () => {
    try {
      await firebaseSignOut(); // Log out the user
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-[200%] h-[200%] bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 opacity-10 blur-3xl rounded-full animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <motion.header
        className="z-10 text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
          Mod Vault
        </h1>
        <p className="text-lg text-gray-300">
          Your ultimate platform for managing and showcasing vehicle builds.
        </p>
      </motion.header>

      {/* Features Section */}
      <motion.section
        className="z-10 mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">Why Choose Mod Vault?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Feature 1 */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold mb-2">Showcase Your Builds</h3>
            <p className="text-gray-400">
              Share your customized vehicles with the community.
            </p>
          </motion.div>
          {/* Feature 2 */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold mb-2">Explore the Community</h3>
            <p className="text-gray-400">
              Discover amazing builds shared by enthusiasts.
            </p>
          </motion.div>
          {/* Feature 3 */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold mb-2">Stay Organized</h3>
            <p className="text-gray-400">
              Keep track of your vehicles and modifications.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Sign-In/Welcome Section */}
      <motion.section
        className="z-10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {!user ? (
          // Sign-In Button
          <button
            onClick={handleSignIn}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white text-lg shadow-lg hover:shadow-xl"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In with GitHub"}
          </button>
        ) : (
          // Welcome Section
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Welcome, {user.displayName}!
            </h2>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg text-white text-lg mb-4 shadow-lg hover:shadow-xl"
            >
              Sign Out
            </button>
            <Link href="/profile" passHref>
              <button className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-lg text-white text-lg shadow-lg hover:shadow-xl">
                Go to Profile
              </button>
            </Link>
          </div>
        )}
      </motion.section>
    </main>
  );
}
