import React, { useState } from "react";
import RequestTable from "../components/RequestTable";
import RequestDetailsModal from "../components/RequestDetailsModal";
import useModal from "../hooks/useModal";

export default function RequestsList({ requests, onStatusChange }) {
  const modal = useModal();
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? requests
      : requests.filter((r) => r.status === filter);

  return (
    <div className="card">
      <div className="table-header">
        <h2>All Document Requests</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="processing">Processing</option>
          <option value="approved">Approved</option>
          <option value="ready">Ready</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <RequestTable
        requests={filtered}
        onView={modal.open}
        onPrint={(r) => console.log("Print Claim Slip for", r)}
      />

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
