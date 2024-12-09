"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../_utils/firebase";
import { onAuthStateChanged, signInWithPopup, signOut, GithubAuthProvider } from "firebase/auth";

// Context to manage authentication state
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe; // Cleanup listener on unmount
  }, []);

  // Sign in with GitHub
  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Sign out
  const firebaseSignOut = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access authentication context
export const useUserAuth = () => useContext(AuthContext);
