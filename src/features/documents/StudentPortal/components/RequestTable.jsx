import React from "react";

const RequestTable = ({ requests, onViewDetails }) => {
  const getStatusClass = (status) => {
    const statusMap = {
      "Processing": "status-processing",
      "Ready for Pickup": "status-ready",
      "Pending Payment": "status-pending-payment",
      "Completed": "status-completed"
    };
    return statusMap[status] || "status-default";
  };

  return (
    <div className="request-table">
      <h3>Recent Document Requests</h3>
      <table>
        <thead>
          <tr>
            <th>REQUEST ID</th>
            <th>DOCUMENT TYPE</th>
            <th>DATE REQUESTED</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.type}</td>
              <td>{r.date}</td>
              <td>
                <span className={`status-badge ${getStatusClass(r.status)}`}>
                  {r.status}
                </span>
              </td>
              <td>
                <button 
                  className="action-btn"
                  onClick={() => onViewDetails(r)}
                >
                  View Details ›
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;