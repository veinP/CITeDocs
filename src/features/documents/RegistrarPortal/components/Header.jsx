import React from "react";

export default function Header({ title, onLogout }) {
  return (
    <div className="admin-header">
      <span className="admin-icon">📊</span>
      <h1>{title}</h1>
      {onLogout && (
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      )}
    </div>
  );
}
