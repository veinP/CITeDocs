import React, { useState } from "react";
import "./StudentPortal.css";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import RequestTable from "./components/RequestTable";
import ActivityPanel from "./components/ActivityPanel";
import RequestDetailsModal from "./components/RequestDetailsModal";

const StudentPortal = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const stats = [
    { 
      title: "Request Document", 
      subtitle: "Submit a new document request",
      icon: "📄"
    },
    { 
      title: "Documents Requested", 
      subtitle: "Total requests pending",
      value: "5",
      icon: "📋"
    },
    { 
      title: "Ready for Pickup", 
      subtitle: "Completed documents",
      value: "2",
      icon: "✓"
    },
  ];

  const requests = [
    { 
      id: "REQ-2025-001", 
      type: "Transcript of Records", 
      date: "2025-01-15", 
      status: "Processing",
      copies: 2,
      dateNeeded: "Nov 15, 2024",
      created: "Oct 15, 2024",
      lastUpdated: "Today"
    },
    { 
      id: "REQ-2025-002", 
      type: "Certificate of Enrollment", 
      date: "2025-01-14", 
      status: "Ready for Pickup",
      copies: 1,
      dateNeeded: "Nov 10, 2024",
      created: "Oct 10, 2024",
      lastUpdated: "Yesterday"
    },
    { 
      id: "REQ-2025-003", 
      type: "Diploma Copy", 
      date: "2025-01-13", 
      status: "Pending Payment",
      copies: 2,
      dateNeeded: "Nov 15, 2024",
      created: "Oct 15, 2024",
      lastUpdated: "Today"
    },
    { 
      id: "REQ-2025-004", 
      type: "Good Moral Character", 
      date: "2025-01-12", 
      status: "Completed",
      copies: 1,
      dateNeeded: "Nov 5, 2024",
      created: "Oct 5, 2024",
      lastUpdated: "3 days ago"
    },
  ];

  const activities = [
    { id: 1, action: "Request REQ-2025-001 submitted", time: "2 hours ago" },
    { id: 2, action: "Payment confirmed for REQ-2025-002", time: "1 day ago" },
    { id: 3, action: "Document REQ-2025-003 ready for pickup", time: "2 days ago" },
    { id: 4, action: "Request REQ-2025-004 completed", time: "3 days ago" },
  ];

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="portal-container">
      <Header studentName="John Doe" />
      <div className="portal-content">
        <div className="portal-main">
          <div className="portal-stats">
            {stats.map((s, index) => (
              <StatCard 
                key={index}
                title={s.title} 
                subtitle={s.subtitle}
                value={s.value}
                icon={s.icon}
              />
            ))}
          </div>
          <RequestTable requests={requests} onViewDetails={handleViewDetails} />
        </div>
        <ActivityPanel activities={activities} />
      </div>
      
      {selectedRequest && (
        <RequestDetailsModal 
          request={selectedRequest} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default StudentPortal;