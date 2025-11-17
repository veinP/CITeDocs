import React, { useState } from "react";
import "../StudentPortal.css";
import Header from "../components/Header";
import Footer from "../../../../components/layout/Footer";
import RequestDetailsModal from "../components/RequestDetailsModal";
import { Link } from "react-router-dom";

const RequestsList = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const requests = [
    {
      id: "REQ-2025-001",
      type: "Transcript of Records",
      dateRequested: "Jan 10, 2025",
      status: "Processing",
      copies: 2,
      dateNeeded: "Feb 1, 2025",
      created: "Jan 10, 2025 09:00 AM",
      updated: "Jan 15, 2025 02:30 PM",
      proofUrl: "/media/payments/proof1.png",
    },
    {
      id: "REQ-2025-002",
      type: "Certificate of Enrollment",
      dateRequested: "Jan 14, 2025",
      status: "Approved",
      copies: 1,
      dateNeeded: "Feb 2, 2025",
      created: "Jan 14, 2025 01:00 PM",
      updated: "Jan 14, 2025 08:30 PM",
      proofUrl: "/media/payments/proof2.png",
    },
    {
      id: "REQ-2025-003",
      type: "Diploma Copy",
      dateRequested: "Jan 13, 2025",
      status: "Pending",
      copies: 1,
      dateNeeded: "Feb 3, 2025",
      created: "Jan 13, 2025 10:00 AM",
      updated: "Jan 13, 2025 03:00 PM",
      proofUrl: "",
    },
    {
      id: "REQ-2025-004",
      type: "Good Moral Character",
      dateRequested: "Jan 12, 2025",
      status: "Completed",
      copies: 1,
      dateNeeded: "Feb 4, 2025",
      created: "Jan 12, 2025 09:30 AM",
      updated: "Jan 12, 2025 05:00 PM",
      proofUrl: "/media/payments/proof4.png",
    },
  ];

  // ------------------------------
  //  FILTER + SEARCH LOGIC
  // ------------------------------
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.type.toLowerCase().includes(search.toLowerCase()) ||
      req.id.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || req.status.toLowerCase() === filter;

    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (req) => setSelectedRequest(req);
  const handleCloseModal = () => setSelectedRequest(null);

  return (
    <div className="portal-container">
      <Header studentName="John Doe" />

      <main className="dashboard-container requests-list-page">
        <section className="table-section">
          <div className="section-header">
            <h2>All Document Requests</h2>

            {/* SEARCH + FILTER */}
            <div className="table-controls">
              <input
                type="text"
                placeholder="🔍 Search by ID or document type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="request-table">
            <table className="requests-table">
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>

              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Document Type</th>
                  <th>Date Requested</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <tr key={req.id}>
                      <td className="request-id">
                        <strong>{req.id}</strong>
                      </td>
                      <td>{req.type}</td>
                      <td>{req.dateRequested}</td>
                      <td className="center">
                        <span
                          className={`status-badge ${
                            req.status.toLowerCase() === "approved"
                              ? "status-ready"
                              : req.status.toLowerCase() === "processing"
                              ? "status-processing"
                              : req.status.toLowerCase() === "pending"
                              ? "status-pending-payment"
                              : req.status.toLowerCase() === "completed"
                              ? "status-completed"
                              : "status-rejected"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>

                      <td className="action-cell">
                        <button
                          className="action-btn"
                          onClick={() => handleViewDetails(req)}
                        >
                          View Details
                        </button>

                        {(req.status === "Approved" ||
                          req.status === "Completed") && (
                          <Link
                            to={`/claim/${req.id}`}
                            className="action-btn claim-slip-btn"
                          >
                            Claim Slip
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="center-cell">
                      No matching requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span className="showing-text">
              Showing {filteredRequests.length} results (Total{" "}
              {requests.length})
            </span>
          </div>
        </section>
      </main>

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

export default RequestsList;
