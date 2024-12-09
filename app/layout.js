import { AuthContextProvider } from "./_utils/auth-context"; // Provide authentication context
import Navbar from "./components/Navbar"; // Global navigation bar
import localFont from "next/font/local";
import "./globals.css"; // Global CSS styles

// Configure custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for the site
export const metadata = {
  title: "Mod Vault", // Page title
  description: "Track and manage your car modifications", // Description for SEO
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          <Navbar /> {/* Persistent navigation bar */}
          {children} {/* Render child components (pages) */}
        </AuthContextProvider>
      </body>
    </html>
  );
}
