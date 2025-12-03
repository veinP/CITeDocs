import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import StudentLogin from "./features/auth/Login/StudentLogin";
import RegistrarLogin from "./features/auth/Login/RegistrarLogin";
import StudentRegister from "./features/auth/Register/StudentRegister";
import RegistrarRegister from "./features/auth/Register/RegistrarRegister";

import RegistrarPortal from "./features/documents/RegistrarPortal/RegistrarPortal";
import ClaimSlip from "./features/documents/ClaimSlip/ClaimSlip";
import StudentPortal from "./features/documents/StudentPortal/StudentPortal";
import RequestsList from "./features/documents/StudentPortal/pages/RequestsList";
import DocumentRequest from "./features/documents/DocumentRequest/DocumentRequest";
import ForgotPasswordPage from "./features/auth/ForgotPassword/ForgotPasswordPage";

import {
  AuthProvider,
  useAuthContext,
} from "./features/auth/context/AuthContext";

import "./styles/global.css";

function AppContent() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <p>Loading session...</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <main style={{ flex: 1 }}>
        <Routes>

          {/* Default redirect based on user role */}
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/student-login" />
              ) : user.role === "REGISTRAR" ? (
                <Navigate to="/registrar" />
              ) : (
                <Navigate to="/student" />
              )
            }
          />

          {/* Student Auth */}
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-register" element={<StudentRegister />} />

          {/* Registrar Auth */}
          <Route path="/registrar-login" element={<RegistrarLogin />} />
          <Route path="/registrar-register" element={<RegistrarRegister />} />

          {/* Forgot Password */}
          <Route path="/forgot-password/:role" element={<ForgotPasswordPage />} />

          {/* Student Portal */}
          <Route
            path="/student/*"
            element={
              user && user.role === "STUDENT" ? (
                <StudentPortal />
              ) : (
                <Navigate to="/student-login" replace />
              )
            }
          />

          <Route
            path="/student/request-form"
            element={
              user && user.role === "STUDENT" ? (
                <DocumentRequest />
              ) : (
                <Navigate to="/student-login" replace />
              )
            }
          />

          <Route
            path="/student/requests"
            element={
              user && user.role === "STUDENT" ? (
                <RequestsList />
              ) : (
                <Navigate to="/student-login" replace />
              )
            }
          />

          {/* Registrar Portal */}
          <Route
            path="/registrar/*"
            element={
              user && user.role === "REGISTRAR" ? (
                <RegistrarPortal />
              ) : (
                <Navigate to="/registrar-login" replace />
              )
            }
          />

          {/* Claim Slip */}
          <Route path="/claim/:id" element={<ClaimSlip />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
