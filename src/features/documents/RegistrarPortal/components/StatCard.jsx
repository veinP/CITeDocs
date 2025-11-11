import React from "react";
import { useNavigate } from "react-router-dom";

export default function StatCard({ label, value, color, link }) {
  const navigate = useNavigate();

  return (
    <div
      className="stat-card card"
      onClick={() => link && navigate(link)}
      style={{ cursor: link ? "pointer" : "default" }}
    >
      <h3>{label}</h3>
      <p className={`stat-number ${color}`}>{value}</p>
    </div>
  );
}
