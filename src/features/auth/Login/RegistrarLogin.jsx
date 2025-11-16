import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../../assets/images/app_logo.png";
import documentIcon from "../../../assets/images/document_icon.png";
import swapIcon from "../../../assets/images/swap.png";
import { validateRegistrarLogin } from "../validation/registrarLoginValidation";

export default function RegistrarLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, error } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validateRegistrarLogin({ email, password });
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});
  const user = await login(email, password, "registrar"); // ✅ role check

  if (user) navigate("/registrar", { replace: true });
};


  return (
    <div className="login-page">
      <header className="login-page-header">
        <img src={logo} alt="CITeDocs" className="header-logo" />
      </header>

      <div className="login-content">
        {/* Left Side */}
        <div className="welcome-section">
          <div className="document-icon-wrapper">
            <img src={documentIcon} alt="Document" className="document-icon" />
          </div>
          <h1 className="welcome-title">WELCOME BACK TO CITEDOCS</h1>
          <p className="welcome-text">
            Sign in to help students manage their document requests efficiently and
            stay updated on their progress.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-section">
          <div className="login-card">
            <div className="card-header">
              <Link to="/student-login" className="registrar-btn">
                <img src={swapIcon} alt="Switch" className="swapIcon" />
                STUDENT
              </Link>
            </div>

            <h2 className="login-title">LOGIN AS REGISTRAR</h2>

            {/* Show validation or backend errors */}
            {error && <div className="alert alert-error">{error}</div>}
            {errors.email && <div className="alert alert-error">{errors.email}</div>}
            {errors.password && <div className="alert alert-error">{errors.password}</div>}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "error" : ""}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? "error" : ""}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-signin">
                SIGN IN
              </button>

              <Link to="/registrar-register" className="btn btn-secondary btn-create">
                CREATE NEW ACCOUNT
              </Link>

              <div className="forgot-password">
                <Link to="/forgot-password/registrar">Forgot Password?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
