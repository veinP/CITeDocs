import React, { useState } from "react";

const RequestDetailsModal = ({ request, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!request) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`Uploading ${selectedFile.name}...`);
      // Handle upload logic here
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-header">
          <div>
            <h2>{request.id}</h2>
            <p className="modal-subtitle">Request Details</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-grid">
            <div className="modal-field">
              <label>Document</label>
              <p className="modal-value">{request.type}</p>
            </div>
            <div className="modal-field">
              <label>Copies</label>
              <p className="modal-value">{request.copies || 2}</p>
            </div>
            <div className="modal-field">
              <label>Status</label>
              <p className="modal-value">{request.status}</p>
            </div>
          </div>

          <div className="modal-grid">
            <div className="modal-field">
              <label>Date Needed</label>
              <p className="modal-value">{request.dateNeeded || "Nov 15, 2024"}</p>
            </div>
            <div className="modal-field">
              <label>Created</label>
              <p className="modal-value">{request.created || "Oct 15, 2024"}</p>
            </div>
            <div className="modal-field">
              <label>Last Updated</label>
              <p className="modal-value">{request.lastUpdated || "Today"}</p>
            </div>
          </div>

          {request.status === "Pending Payment" && (
            <div className="proof-of-payment">
              <div className="proof-header">
                <span className="proof-icon">📥</span>
                <span>Proof of Payment</span>
              </div>
              <div className="upload-area">
                <div className="upload-placeholder">
                  {selectedFile ? (
                    <div className="file-selected">
                      <p>✓ {selectedFile.name}</p>
                      <button className="upload-btn" onClick={handleUpload}>
                        Upload Receipt
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="upload-text">Payment receipt image</p>
                      <input 
                        type="file" 
                        id="file-upload"
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="file-upload" className="upload-btn">
                        Choose File
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestDetailsModal;