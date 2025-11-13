import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RequestTable({ requests, onView }) {
  const [proofImage, setProofImage] = useState(null); // store selected proof image

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "badge-pending";
      case "processing":
        return "badge-processing";
      case "approved":
        return "badge-approved";
      case "completed":
        return "badge-completed";
      case "rejected":
        return "badge-rejected";
      default:
        return "badge-default";
    }
  };

  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Document Type</th>
              <th>Copies</th>
              <th>Date</th>
              <th>Proof Image</th>
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

                  {/* ✅ Proof Image column with button */}
                  <td>
                    {req.proofImage ? (
                      <button
                        className="btn-small proof-btn"
                        onClick={() => setProofImage(req.proofImage)}
                      >
                        View Proof
                      </button>
                    ) : (
                      <em style={{ color: "#888" }}>No proof</em>
                    )}
                  </td>

                  <td>
                    <span className={`badge ${getStatusBadgeClass(req.status)}`}>
                      {req.status.toUpperCase()}
                    </span>
                  </td>

                  {/* ✅ Actions */}
                  <td>
                    <div className="action-buttons">
                      {/* View Button */}
                      <button
                        className="btn-small btn-outline"
                        onClick={() => onView(req)}
                      >
                        Update
                      </button>

                      {/* Claim Slip button visible for Approved + Ready */}
                      {(req.status.toLowerCase() === "completed" ||
                        req.status.toLowerCase() === "approved") && (
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
                <td colSpan="8" style={{ textAlign: "center", padding: "1rem" }}>
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Proof Image Modal */}
      {proofImage && (
        <div
          className="proof-modal-overlay"
          onClick={() => setProofImage(null)}
        >
          <div className="proof-modal" onClick={(e) => e.stopPropagation()}>
            <img src={proofImage} alt="Proof" className="proof-modal-img" />
            <button
              className="close-btn"
              onClick={() => setProofImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
