import React, { useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import RequestsList from "./pages/RequestsList";
import "./RegistrarPortal.css";

export default function RegistrarPortal() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      studentName: "John Doe",
      studentId: "2024-001",
      documentType: "Transcript of Records",
      purpose: "Job Application",
      copies: 2,
      status: "processing",
      date: "2024-01-15",
      proofImage: "/proof1.jpg",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentId: "2024-002",
      documentType: "Certificate of Good Moral",
      purpose: "Scholarship",
      copies: 1,
      status: "approved",
      date: "2024-01-14",
      proofImage: "",
    },
    {
      id: 3,
      studentName: "Jan Sith",
      studentId: "2024-003",
      documentType: "Certificate of Enrollment",
      purpose: "Internship",
      copies: 3,
      status: "ready",
      date: "2024-02-01",
      proofImage: "",
    },
    {
      id: 4,
      studentName: "Blissy Chavez",
      studentId: "2024-004",
      documentType: "Certificate of Good Moral",
      purpose: "Scholarship",
      copies: 1,
      status: "rejected",
      date: "2024-01-14",
      proofImage: "",
    },
  ]);

  const handleStatusChange = (id, newStatus, remarks) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus, remarks } : req
      )
    );
  };

  const stats = {
    total: requests.length,
    processing: requests.filter((r) => r.status === "processing").length,
    approved: requests.filter((r) => r.status === "approved").length,
    ready: requests.filter((r) => r.status === "ready").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

  return (
    <div className="admin-portal-container">
      <Header title="Registrar Portal" />

      <div className="stats-grid">
        <StatCard label="Total Requests" value={stats.total} color="stat-total" link="/all" />
        <StatCard label="Processing" value={stats.processing} color="stat-warning" link="/processing" />
        <StatCard label="Approved" value={stats.approved} color="stat-info" link="/approved" />
        <StatCard label="Ready for Pickup" value={stats.ready} color="stat-success" link="/ready" />
      </div>

      {/* 🧾 Scrollable section for requests */}
      <div className="scrollable-section">
        <RequestsList requests={requests} onStatusChange={handleStatusChange} />
      </div>

      <footer className="admin-footer">© 2025 Registrar Portal. All rights reserved.</footer>
    </div>
  );
}
