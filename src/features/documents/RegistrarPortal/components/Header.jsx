import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../auth/context/AuthContext";
import appLogo from "../../../../assets/images/app_logo.png";

export default function Header({ registrarName = "Registrar" }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const notifications = [
    { id: 1, message: "REQ-2025-007 was successfully approved", time: "1 hour ago", unread: true },
    { id: 2, message: "New document request submitted by Student A", time: "3 hours ago", unread: true },
    { id: 3, message: "Payment confirmation for REQ-2025-006 received", time: "1 day ago", unread: false },
  ];

  const handleLogout = () => {
    logout();
    navigate("/registrar-login", { replace: true });
  };

  return (
    <>
      <header
        style={{
          backgroundColor: "#8B2635",
          color: "white",
          padding: "16px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Left Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <img
            src={appLogo}
            alt="CITeDocs Logo"
            style={{ height: "48px", cursor: "pointer" }}
            onClick={() => navigate("/registrar")}
          />

          {/* Navigation Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <NavLink
              to="/registrar"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/registrar/all-requests"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              All Requests
            </NavLink>
          </nav>
        </div>

        {/* Right Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span style={{ fontSize: "22px" }}>🔔</span>
              <span className="notification-badge">
                {notifications.filter((n) => n.unread).length}
              </span>
            </div>

            {showNotifications && (
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  right: 0,
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  width: "320px",
                  zIndex: 1000,
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid #e5e5e5",
                    fontWeight: 700,
                    color: "#333",
                    fontSize: "16px",
                  }}
                >
                  Notifications
                </div>
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        padding: "16px 20px",
                        borderBottom: "1px solid #f0f0f0",
                        cursor: "pointer",
                        backgroundColor: notif.unread ? "#fff5f5" : "white",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f8f8f8")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = notif.unread
                          ? "#fff5f5"
                          : "white")
                      }
                    >
                      <p
                        style={{
                          margin: "0 0 6px 0",
                          color: "#333",
                          fontSize: "14px",
                          fontWeight: notif.unread ? 600 : 400,
                        }}
                      >
                        {notif.message}
                      </p>
                      <small style={{ color: "#999", fontSize: "12px" }}>
                        {notif.time}
                      </small>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    padding: "12px 20px",
                    textAlign: "center",
                    borderTop: "1px solid #e5e5e5",
                    cursor: "pointer",
                    color: "#8B2635",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                  onClick={() => {
                    alert("Marked all as read");
                    setShowNotifications(false);
                  }}
                >
                  Mark all as read
                </div>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="user-avatar">JD</div>
          <span style={{ fontWeight: "600", fontSize: "15px" }}>
            {registrarName}
          </span>

          {/* Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Overlay for Notifications */}
      {showNotifications && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setShowNotifications(false)}
        />
      )}
    </>
  );
}
