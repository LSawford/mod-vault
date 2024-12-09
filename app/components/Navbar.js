"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Logo linking to the homepage */}
        <Link href="/">
          <img
            src="/images/logo.webp"
            alt="Mod Vault Logo"
            className="h-10 mr-6"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg hover:underline">Home</Link>
          <Link href="/vehicles" className="text-lg hover:underline">Vehicles</Link>
          <Link href="/profile" className="text-lg hover:underline">Profile</Link>
          <Link href="/dashboard" className="text-lg hover:underline">Dashboard</Link>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
