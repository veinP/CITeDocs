import React, { useState } from "react";
import "./StudentPortal.css";
import Header from "./components/Header";
import Footer from "../../../components/layout/Footer";
import StatCard from "./components/StatCard";
import RequestTable from "./components/RequestTable";
import ActivityPanel from "./components/ActivityPanel";
import RequestDetailsModal from "./components/RequestDetailsModal";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const StudentPortal = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if current path is the dashboard root (/student)
  const isDashboard = location.pathname === "/student";

  const stats = [
    {
      title: "Request Document",
      subtitle: "Submit a new document request",
      icon: "📄",
      variant: "primary",
      onClick: () => navigate("/student/request-form"), // ✅ link to request form
    },
    {
      title: "Documents Requested",
      subtitle: "View all your previous requests",
      value: "5",
      icon: "📋",
      variant: "yellow",
      onClick: () => navigate("/student/requests"), // ✅ link to all requests
    },
    {
      title: "Ready for Pickup",
      subtitle: "Approved documents",
      value: "2",
      icon: "✓",
      variant: "white",
    },
  ];

  const requests = [
    {
      id: "REQ-2025-001",
      type: "Transcript of Records",
      date: "Jan 10, 2025",
      status: "Processing",
      copies: 2,
      dateNeeded: "Feb 1, 2025",
      created: "Jan 10, 2025",
      lastUpdated: "Today",
    },
    {
      id: "REQ-2025-002",
      type: "Certificate of Enrollment",
      date: "Jan 14, 2025",
      status: "Approved",
      copies: 1,
      dateNeeded: "Feb 2, 2025",
      created: "Jan 14, 2025",
      lastUpdated: "Yesterday",
    },
    {
      id: "REQ-2025-003",
      type: "Diploma Copy",
      date: "Jan 13, 2025",
      status: "Pending",
      copies: 2,
      dateNeeded: "Feb 3, 2025",
      created: "Jan 13, 2025",
      lastUpdated: "Today",
    },
    {
      id: "REQ-2025-004",
      type: "Good Moral Character",
      date: "Jan 12, 2025",
      status: "Completed",
      copies: 1,
      dateNeeded: "Feb 4, 2025",
      created: "Jan 12, 2025",
      lastUpdated: "3 days ago",
    },
  ];

  const activities = [
    { id: 1, action: "Request REQ-2025-001 submitted", time: "2 hours ago" },
    { id: 2, action: "Payment confirmed for REQ-2025-002", time: "1 day ago" },
    { id: 3, action: "Document REQ-2025-003 ready for pickup", time: "2 days ago" },
    { id: 4, action: "Request REQ-2025-004 completed", time: "3 days ago" },
  ];

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="portal-container">
      <Header studentName="John Doe" />

      {/* Nested routes */}
      <Outlet />

      {/* Dashboard content */}
      {isDashboard && (
        <div className="portal-content">
          <div className="portal-main">
            <div className="portal-stats">
              {stats.map((s, index) => (
                <div
                  key={index}
                  onClick={s.onClick}
                  style={{ cursor: s.onClick ? "pointer" : "default" }}
                >
                  <StatCard
                    title={s.title}
                    subtitle={s.subtitle}
                    value={s.value}
                    icon={s.icon}
                    variant={s.variant}
                  />
                </div>
              ))}
            </div>

            <RequestTable requests={requests} onViewDetails={handleViewDetails} />
          </div>

          <ActivityPanel activities={activities} />
        </div>
      )}

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={handleCloseModal}
        />
      )}
      <Footer />
    </div>
  );
};

export default StudentPortal;
