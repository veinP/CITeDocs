import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [error, setError] = useState(null);

  // Mock users 
  const users = [
    {
      email: "student@cit.edu",
      password: "12345",
      role: "student",
      name: "John Doe",
    },
    {
      email: "registrar@cit.edu",
      password: "12345",
      role: "registrar",
      name: "Registrar Jane",
    },
  ];

  // LOGIN
  const login = async (email, password, expectedRole) => {
    setError(null);

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password.");
      return null;
    }

    // Enforce login page role
    if (foundUser.role !== expectedRole) {
      setError(
        `Unauthorized: Please use the ${
          foundUser.role === "registrar" ? "Registrar" : "Student"
        } login page.`
      );
      return null;
    }

    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));
    return foundUser;
  };

  // FORGOT PASSWORD 

  const forgotPassword = (email) => {
    setError(null);

    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      setError("Email not found in the system.");
      return null;
    }

    // Success Message
    return `A password reset link has been sent to ${email}`;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        forgotPassword,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
