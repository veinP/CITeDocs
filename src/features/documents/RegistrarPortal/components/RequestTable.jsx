import React from "react";

export default function RequestTable({ requests, onView, onPrint }) {
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
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.studentId}</td>
              <td>{req.studentName}</td>
              <td>{req.documentType}</td>
              <td>{req.copies}</td>
              <td>{req.date}</td>
              <td>
                <span className={`badge badge-${req.status}`}>
                  {req.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn-small btn-outline"
                    onClick={() => onView(req)}
                  >
                    View
                  </button>
                  {req.status === "ready" && (
                    <button
                      className="btn-small btn-primary"
                      onClick={() => onPrint(req)}
                    >
                      Claim Slip
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 