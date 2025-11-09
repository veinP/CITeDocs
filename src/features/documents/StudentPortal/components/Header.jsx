import React, { useState } from "react";
import appLogo from "../../../../assets/images/app_logo.png";

const Header = ({ studentName }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: "REQ-2025-001 is now processing", time: "2 hours ago", unread: true },
    { id: 2, message: "Payment confirmed for REQ-2025-002", time: "1 day ago", unread: true },
    { id: 3, message: "Document REQ-2025-003 ready for pickup", time: "2 days ago", unread: true },
  ];

  return (
    <>
      <header
        style={{
          backgroundColor: "#8B2635",
          color: "white",
          padding: "16px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={appLogo}
            alt="CITeDocs Logo"
            style={{ height: "48px" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ position: "relative" }}>
            <div 
              style={{ cursor: "pointer" }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span style={{ fontSize: "22px" }}>🔔</span>
              <span className="notification-badge">3</span>
            </div>
            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '45px',
                right: 0,
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                width: '320px',
                zIndex: 1000,
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #e5e5e5',
                  fontWeight: 700,
                  color: '#333',
                  fontSize: '16px'
                }}>
                  Notifications
                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {notifications.map((notif) => (
                    <div key={notif.id} style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid #f0f0f0',
                      cursor: 'pointer',
                      backgroundColor: notif.unread ? '#fff5f5' : 'white',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f8f8'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = notif.unread ? '#fff5f5' : 'white'}
                    >
                      <p style={{ 
                        margin: '0 0 6px 0', 
                        color: '#333', 
                        fontSize: '14px',
                        fontWeight: notif.unread ? 600 : 400
                      }}>
                        {notif.message}
                      </p>
                      <small style={{ color: '#999', fontSize: '12px' }}>
                        {notif.time}
                      </small>
                    </div>
                  ))}
                </div>
                <div style={{
                  padding: '12px 20px',
                  textAlign: 'center',
                  borderTop: '1px solid #e5e5e5',
                  cursor: 'pointer',
                  color: '#8B2635',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
                onClick={() => {
                  alert('Mark all as read');
                  setShowNotifications(false);
                }}
                >
                  Mark all as read
                </div>
              </div>
            )}
          </div>
          <div className="user-avatar">JD</div>
          <span style={{ fontWeight: "600", fontSize: "15px" }}>{studentName}</span>
          <button className="logout-btn">Logout</button>
        </div>
      </header>
      {showNotifications && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowNotifications(false)}
        />
      )}
    </>
  );
};

export default Header;