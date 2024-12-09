"use client";

import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";

const Dashboard = () => {
  const { user, firebaseSignOut } = useUserAuth(); // Access user authentication state and sign-out function

  // Redirect to login page if user is not authenticated
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">You must log in to access the dashboard.</h1>
          <Link href="/" className="mt-4 text-blue-500 underline">
            Go to Login Page
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white px-8 py-12">
      {/* Header with page title and logout button */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Your Dashboard</h1>
        <button
          onClick={firebaseSignOut}
          className="bg-red-500 hover:bg-red-700 transition text-white text-lg py-2 px-6 rounded-full shadow-lg"
        >
          Logout
        </button>
      </header>

      {/* Welcome message */}
      <section className="mb-12 text-center">
        <h2 className="text-2xl font-semibold mb-2">Welcome, {user.displayName}!</h2>
        <p className="text-lg text-gray-300">
          Manage your vehicles, modifications, and explore your car journey with ease.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold mb-4">Your Vehicles</h3>
          <p className="text-gray-400 mb-4">
            View and manage all the vehicles you've added to Mod Vault.
          </p>
          <Link
            href="/profile"
            className="text-blue-400 hover:text-blue-500 underline"
          >
            View Vehicles
          </Link>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold mb-4">Modification Tracker</h3>
          <p className="text-gray-400 mb-4">
            Log and track all your modifications, from small tweaks to major overhauls.
          </p>
          <Link
            href="/modifications"
            className="text-blue-400 hover:text-blue-500 underline"
          >
            View Modifications
          </Link>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold mb-4">Analytics</h3>
          <p className="text-gray-400 mb-4">
            Gain insights into your spending and progress across your vehicles.
          </p>
          <Link
            href="/dashboard"
            className="text-blue-400 hover:text-blue-500 underline"
          >
            View Analytics
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2024 Mod Vault. Built with ❤️ by car enthusiasts.</p>
      </footer>
    </main>
  );
};

export default Dashboard;
