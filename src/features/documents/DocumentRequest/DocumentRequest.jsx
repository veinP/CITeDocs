import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../StudentPortal/StudentPortal.css"; 
import Header from "../StudentPortal/components/Header"; 
import Footer from "../../../components/layout/Footer";
import "./DocumentRequest.css";

const documentTypes = [
  { value: "transcript", label: "Transcript of Records" },
  { value: "diploma", label: "Diploma" },
  { value: "good-moral", label: "Certificate of Good Moral" },
  { value: "enrollment", label: "Certificate of Enrollment" },
  { value: "grades", label: "True Copy of Grades" },
];

export default function DocumentRequest() {
  const [formData, setFormData] = useState({
    studentId: "20-2423-001",
    studentName: "John Doe",
    documentType: "",
    dateNeeded: "",
    copies: 1,
    proofFile: null,
  });

  const [userRequests, setUserRequests] = useState([
    {
      id: "REQ-2025-001",
      documentLabel: "Transcript of Records",
      copies: 2,
      dateNeeded: "Nov 15, 2025",
      status: "Processing",
      proofUrl: "https://via.placeholder.com/300x200.png?text=Proof+of+Payment",
    },
    {
      id: "REQ-2025-002",
      documentLabel: "Certificate of Enrollment",
      copies: 1,
      dateNeeded: "Nov 10, 2025",
      status: "Approved",
      proofUrl: "https://via.placeholder.com/300x200.png?text=Proof+of+Payment",
    },
    {
      id: "REQ-2025-003",
      documentLabel: "Good Moral Character",
      copies: 1,
      dateNeeded: "Nov 5, 2025",
      status: "Completed",
      proofUrl: "https://via.placeholder.com/300x200.png?text=Proof+of+Payment",
    },
  ]);

  const [success, setSuccess] = useState(false);
  const [proofModal, setProofModal] = useState({ visible: false, imgUrl: "" });

  // Prevent past dates
  const today = new Date().toISOString().split("T")[0];

  const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, proofFile: file });
    }
  };

  const generateRequestId = () => {
    const currentYear = new Date().getFullYear();
    const yearPrefix = `REQ-${currentYear}-`;
    
    const yearRequests = userRequests.filter(req => req.id.startsWith(yearPrefix));
    let maxSeq = 0;
    
    yearRequests.forEach(req => {
      const seqStr = req.id.replace(yearPrefix, '');
      const seqNum = parseInt(seqStr, 10);
      if (!isNaN(seqNum) && seqNum > maxSeq) {
        maxSeq = seqNum;
      }
    });
    
    const nextSeq = maxSeq + 1;
    return `${yearPrefix}${nextSeq.toString().padStart(3, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATION
    if (!formData.documentType) {
      alert("Please select a document type.");
      return;
    }

    if (!formData.dateNeeded) {
      alert("Please choose a date needed.");
      return;
    }

    if (formData.dateNeeded < today) {
      alert("The date needed cannot be in the past.");
      return;
    }

    if (!formData.copies || formData.copies < 1) {
      alert("Please enter a valid number of copies (at least 1).");
      return;
    }

    if (!formData.proofFile) {
      alert("Please upload a proof of payment file.");
      return;
    }

    const newRequest = {
      id: generateRequestId(),
      documentLabel:
      documentTypes.find((doc) => doc.value === formData.documentType)?.label || "",
      copies: formData.copies,
      dateNeeded: formatDate(formData.dateNeeded), // <-- formatted!
      status: "Pending",
      proofUrl: formData.proofFile ? URL.createObjectURL(formData.proofFile) : "",
    };


    setUserRequests([newRequest, ...userRequests]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);

    setFormData({
      ...formData,
      documentType: "",
      dateNeeded: "",
      copies: 1,
      proofFile: null,
    });
  };

  const openProofModal = (imgUrl) => {
    setProofModal({ visible: true, imgUrl });
  };

  const closeProofModal = () => {
    setProofModal({ visible: false, imgUrl: "" });
  };

  return (
    <div className="portal-container">
      <Header studentName="John Doe" />

      <div className="request-container">
        <div className="form-card">
          <div className="form-header">
            <div className="form-icon">📄</div>
            <div>
              <h2>Request a New Document</h2>
              <p>
                Please fill out the form to request a document from the
                Registrar's Office.
              </p>
            </div>
          </div>

          {success && (
            <div className="alert alert-success">
              Request submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-grid" noValidate>
            <div className="form-group">
              <label>Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Student Name</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Document Type</label>
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Document Type --</option>
                {documentTypes.map((doc) => (
                  <option key={doc.value} value={doc.value}>
                    {doc.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Date Needed</label>
              <input
                type="date"
                name="dateNeeded"
                value={formData.dateNeeded}
                onChange={handleChange}
                min={today}
                required
              />
            </div>

            <div className="form-group">
              <label>Number of Copies <span style={{ color: "red" }}>*</span></label>
              <input
                type="number"
                name="copies"
                min="1"
                value={formData.copies}
                onChange={handleChange}
              />
            </div>

            <div className="file-upload">
              <div className="upload-icon">📤</div>
              <p className="upload-title">Proof of Payment Upload <span style={{ color: "red" }}>*</span></p>
              <p className="upload-subtitle">
                Upload your payment receipt here
              </p>
              <input
                type="file"
                id="proofFile"
                name="proofFile"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <label htmlFor="proofFile" className="file-label">
                {formData.proofFile
                  ? `📎 ${formData.proofFile.name}`
                  : "Choose File"}
              </label>
              <p className="upload-info">
                Supported formats: PNG, JPG, JPEG, WEBP
              </p>
            </div>

            <div className="submit-btn">
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </div>
          </form>
        </div>

        <div className="history-card">
          <div className="history-header">
            <h3>Request History</h3>
          </div>
          <div className="history-table-wrapper">
            {userRequests.length === 0 ? (
              <p className="empty-state">No requests found.</p>
            ) : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>REQUEST ID</th>
                    <th>DOCUMENT</th>
                    <th>COPIES</th>
                    <th>DATE NEEDED</th>
                    <th>STATUS</th>
                    <th>PAYMENT</th>
                    <th>CLAIM SLIP</th>
                  </tr>
                </thead>
                <tbody>
                  {userRequests.map((req) => (
                    <tr key={req.id}>
                      <td>{req.id}</td>
                      <td>{req.documentLabel}</td>
                      <td>{req.copies}</td>
                      <td>{req.dateNeeded}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            req.status === "Processing"
                              ? "status-processing"
                              : req.status === "Approved"
                              ? "status-ready"
                              : req.status === "Completed"
                              ? "status-completed"
                              : "status-pending-payment"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>

                      <td>
                        {req.proofUrl ? (
                          <button
                            className="view-proof-btn"
                            onClick={() => openProofModal(req.proofUrl)}
                          >
                            View Proof
                          </button>
                        ) : (
                          <span style={{ color: "#999" }}>No Payment</span>
                        )}
                      </td>

                      <td>
                        {req.status === "Approved" ||
                        req.status === "Completed" ? (
                          <Link
                            to={`/claim/${req.id}`}
                            className="action-btn claim-slip-btn"
                          >
                            Claim Slip
                          </Link>
                        ) : (
                          <span style={{ color: "#999" }}>Not Available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {proofModal.visible && (
        <div className="modal-overlay" onClick={closeProofModal}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeProofModal}>
              ✕
            </button>
            <img
              src={proofModal.imgUrl}
              alt="Proof of Payment"
              style={{
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
