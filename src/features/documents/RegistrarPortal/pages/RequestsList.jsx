import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RequestTable from "../components/RequestTable";
import RequestDetailsModal from "../components/RequestDetailsModal";
import useModal from "../hooks/useModal";

export default function RequestsList({ requests = [], onStatusChange }) {
  const modal = useModal();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const location = useLocation();

  // ✅ Get status from query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusFromURL = params.get("status");
    if (statusFromURL) setFilter(statusFromURL);
    else setFilter("all");
  }, [location.search]);

  // ✅ Filtering logic
  const filtered = requests.filter((r) => {
    const matchesStatus = filter === "all" || r.status.toLowerCase() === filter;
    const matchesSearch =
      r.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      r.documentType?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="card">
      <div className="table-header">
        <h2>
          {filter === "all"
            ? "All Document Requests"
            : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Requests`}
        </h2>

        {/* ✅ Search + Filter side by side */}
        <div className="table-controls">
          <input
            type="text"
            placeholder="🔍 Search by name or document..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="scrollable-table">
        <RequestTable
          requests={filtered}
          onView={modal.open}
          onPrint={(r) => console.log("Print Claim Slip for", r)}
        />
      </div>

      {modal.isOpen && (
        <RequestDetailsModal
          request={modal.data}
          onClose={modal.close}
          onStatusChange={onStatusChange}
        />
      )}
    </div>
  );
}
