import React, { useState } from "react";

export default function RequestDetailsModal({
  request,
  onClose,
  onStatusChange,
}) {
  const [newStatus, setNewStatus] = useState(request.status);
  const [remarks, setRemarks] = useState("");

  if (!request) return null;

  const handleUpdate = () => {
    onStatusChange(request.id, newStatus, remarks);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Request Details</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-row"><strong>Student:</strong> {request.studentName}</div>
          <div className="detail-row"><strong>Student ID:</strong> {request.studentId}</div>
          <div className="detail-row"><strong>Document:</strong> {request.documentType}</div>
          <div className="detail-row"><strong>Purpose:</strong> {request.purpose}</div>
          <div className="detail-row"><strong>Copies:</strong> {request.copies}</div>
          <div className="detail-row"><strong>Date Requested:</strong> {request.date}</div>

          <div className="detail-row">
            <strong>Proof Image:</strong>
            {request.proofImage ? (
              <img
                src={request.proofImage}
                alt="Proof"
                className="proof-image"
              />
            ) : (
              <em>No proof uploaded</em>
            )}
          </div>

          <div className="detail-row">
            <strong>Status:</strong>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="ready">Ready</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="detail-row">
            <strong>Remarks:</strong>
            <textarea
              placeholder="Add remarks..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
