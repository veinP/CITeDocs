import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import "./ForgotPassword.css";
import logo from "../../../assets/images/app_logo.png";

export default function ForgotPasswordPage() {
  const { role } = useParams(); // "student" or "registrar"
  const { forgotPassword, error } = useAuthContext();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = forgotPassword(email);

    if (result) {
      setSuccess(result);
    }
  };

  return (
    <div className="forgot-container">
      <header className="forgot-header">
        <img src={logo} alt="CITeDocs" className="forgot-logo" />
      </header>

      <div className="forgot-content">
        <div className="forgot-card">
          <h2 className="forgot-title">Reset Password ({role.toUpperCase()})</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-submit">
              Send Reset Link
            </button>
          </form>

          <div className="back-link">
            <Link to={`/${role}-login`}>Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
