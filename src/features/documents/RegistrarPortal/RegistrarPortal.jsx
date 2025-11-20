import React, { useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import "./RegistrarPortal.css";

import Header from "./components/Header";
import StatCard from "./components/StatCard";
import RequestsList from "./pages/RequestsList";
import ActivityPanel from "./components/ActivityPanel";
import Footer from "../../../components/layout/Footer";

export default function RegistrarPortal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [requests, setRequests] = useState([
    {
      id: "REQ-2025-001",
      studentName: "John Doe",
      studentId: "20-2423-001",
      documentType: "Transcript of Records",
      purpose: "Job Application",
      copies: 2,
      status: "processing",
      date: "Jan 15, 2025",
      proofImage: "/proof-test.jpg",
    },
    {
      id: "REQ-2025-002",
      studentName: "Jane Smith",
      studentId: "20-1678-002",
      documentType: "Certificate of Good Moral",
      purpose: "Scholarship",
      copies: 1,
      status: "approved",
      date: "Jan 14, 2025",
      proofImage: "/proof-image2.jpg",
    },
    {
      id: "REQ-2025-003",
      studentName: "Jan Sith",
      studentId: "22-4689-003",
      documentType: "Certificate of Enrollment",
      purpose: "Internship",
      copies: 3,
      status: "completed",
      date: "Feb 1, 2025",
      proofImage: "/proof-test.jpg",
    },
    {
      id: "REQ-2025-004",
      studentName: "Blissy Chavez",
      studentId: "23-2124-004",
      documentType: "Certificate of Good Moral",
      purpose: "Scholarship",
      copies: 1,
      status: "rejected",
      date: "Jan 14, 2025",
      proofImage: "/proof-image2.jpg",
    },
    {
      id: "REQ-2025-005",
      studentName: "Vein Pangilinan",
      studentId: "23-2124-005",
      documentType: "Transcript of Records",
      purpose: "Internship",
      copies: 8,
      status: "pending",
      date: "Dec 19, 2025",
      proofImage: "/proof-test.jpg",
    },
    {
      id: "REQ-2025-006",
      studentName: "V Pa",
      studentId: "23-2124-005",
      documentType: "Transcript of Records",
      purpose: "Internship",
      copies: 15,
      status: "pending",
      date: "Dec 01, 2025",
      proofImage: "/proof-test.jpg",
    },
  ]);

  const handleStatusChange = (id, newStatus, remarks) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus, remarks } : req
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/registrar-login", { replace: true });
  };

  const stats = [
    {
      label: "Total Requests",
      value: requests.length,
      color: "stat-total",
      link: "/registrar?status=all",
    },
    {
      label: "Pending",
      value: requests.filter((r) => r.status === "pending").length,
      color: "stat-pending",
      link: "/registrar?status=pending",
    },
    {
      label: "Processing",
      value: requests.filter((r) => r.status === "processing").length,
      color: "stat-warning",
      link: "/registrar?status=processing",
    },
    {
      label: "Approved",
      value: requests.filter((r) => r.status === "approved").length,
      color: "stat-approved",
      link: "/registrar?status=approved",
    },
    {
      label: "Completed",
      value: requests.filter((r) => r.status === "completed").length,
      color: "stat-success",
      link: "/registrar?status=completed",
    },
    {
      label: "Rejected",
      value: requests.filter((r) => r.status === "rejected").length,
      color: "stat-danger",
      link: "/registrar?status=rejected",
    },
  ];

  const currentFilter = searchParams.get("status") || "all";
  const filteredRequests =
    currentFilter === "all"
      ? requests
      : requests.filter((r) => r.status === currentFilter);

  const activities = [
    { id: 1, action: "Approved REQ-2025-002", time: "1 hour ago" },
    { id: 2, action: "Marked REQ-2025-003 as ready for pickup", time: "4 hours ago" },
    { id: 3, action: "Rejected REQ-2025-004", time: "Yesterday" },
  ];

  return (
    <div className="portal-container">
      <Header registrarName="Jane Doe" />

      <div className="portal-body">
        {/* Stats Section */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              color={stat.color}
              link={stat.link}
            />
          ))}
        </div>

        {/* Requests Section */}
        <div className="scrollable-section">
          <RequestsList
            requests={filteredRequests}
            onStatusChange={handleStatusChange}
          />
        </div>

        {/* Activity Panel BELOW table */}
        <div className="activity-section">
          <ActivityPanel activities={activities} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
