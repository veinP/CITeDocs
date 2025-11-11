import React from "react";

export default function Footer() {
  return (
    <footer style={{ textAlign: "center", marginTop: "40px", padding: "20px 0", borderTop: "2px solid #eee", fontFamily: "Montserrat, sans-serif", fontSize: "14px", color: "#666" }}>
      © {new Date().getFullYear()} CITeDocs — Registrar Portal
    </footer>
  );
}
