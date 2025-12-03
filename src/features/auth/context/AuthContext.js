// src/features/auth/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../../api";
import { logout as serviceLogout } from "../services/authService"; // optional if you want to call service

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.warn("Session expired or invalid token.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      setIsLoading(false);
    }

    loadSession();
  }, []);

  // Called after successful login
  function loginContext(userData) {
    setUser(userData);
  }

  // Keep old name too
  function logoutContext() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  // Provide a convenient `logout()` function (alias) so components expecting `logout()` work
  function logout() {
    // If you have additional service cleanup, call it:
    try {
      serviceLogout(); // remove localStorage there too (safe even if it duplicates)
    } catch (e) {
      // ignore if serviceLogout not present
    }
    logoutContext();
  }

  return (
    <AuthContext.Provider
      value={{ user, loginContext, logoutContext, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
