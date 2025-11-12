import React from "react";
import { Link } from "react-router-dom";

export default function RequestTable({ requests, onView }) {
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "badge-processing";
      case "approved":
        return "badge-approved";
      case "ready":
        return "badge-ready";
      case "rejected":
        return "badge-rejected";
      default:
        return "badge-default";
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Document Type</th>
            <th>Copies</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.id}>
                <td>{req.studentId}</td>
                <td>{req.studentName}</td>
                <td>{req.documentType}</td>
                <td>{req.copies}</td>
                <td>{req.date}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(req.status)}`}>
                    {req.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {/* View Button */}
                    <button
                      className="btn-small btn-outline"
                      onClick={() => onView(req)}
                    >
                      View
                    </button>

                    {/* Claim Slip link only if status = ready */}
                    {req.status.toLowerCase() === "ready" && (
                      <Link
                        to={`/claim/${req.id}`}
                        className="btn-small btn-primary"
                      >
                        Claim Slip
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
