import React from "react";

const StatCard = ({ title, subtitle, value, icon }) => (
  <div className="stat-card">
    <div className="stat-card-layout">
      <div className="stat-icon-box">{icon || "📄"}</div>
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-subtitle">{subtitle}</p>
      </div>
      {value && <div className="stat-number">{value}</div>}
    </div>
  </div>
);

export default StatCard;