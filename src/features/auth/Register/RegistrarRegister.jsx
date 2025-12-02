import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import logo from "../../../assets/images/app_logo.png";

import { validateRegistrarRegister } from "../validation/registrarValidation";
import { registerUser } from "../services/authService"; // 🔥 backend registration

export default function RegistrarRegister() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    registrarId: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Handle field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError("");

    // Run client-side validation
    const validationErrors = validateRegistrarRegister(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      // 🔥 Send to backend
      await registerUser({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: "REGISTRAR",
        rid: formData.registrarId,
        sid: null,
        aid: null,
      });

      // 🔥 Show success message
      setSuccess(true);

      // Redirect after 2 sec
      setTimeout(() => navigate("/registrar-login"), 2000);

    } catch (err) {
      setBackendError("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="register-page">
      <header className="register-page-header">
        <img src={logo} alt="CITeDocs" className="header-logo" />
      </header>

      <div className="register-content">

        {/* LEFT SIDE */}
        <div className="register-welcome-section">
          <div className="register-icon-circle">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h1 className="register-welcome-title">SIGN UP AS A REGISTRAR</h1>
          <p className="register-welcome-text">
            Sign up to help students<br />
            navigate their requests and stay<br />
            informed every step of the way.
          </p>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="register-form-section">
          <div className="register-card">

            {/* Backend Error */}
            {backendError && (
              <div className="alert alert-error">{backendError}</div>
            )}

            {/* Success Message */}
            {success && (
              <div className="alert alert-success">
                Registration successful! Redirecting to login...
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="name-row">
                {/* First Name */}
                <div className="input-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <span className="field-error">{errors.firstName}</span>
                  )}
                </div>

                {/* Last Name */}
                <div className="input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <span className="field-error">{errors.lastName}</span>
                  )}
                </div>
              </div>

              {/* Registrar ID */}
              <div className="input-group">
                <label htmlFor="registrarId">Registrar ID</label>
                <input
                  type="text"
                  id="registrarId"
                  name="registrarId"
                  value={formData.registrarId}
                  onChange={handleChange}
                  placeholder="XXXX"
                />
                {errors.registrarId && (
                  <span className="field-error">{errors.registrarId}</span>
                )}
              </div>

              {/* Email */}
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="field-error">{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <span className="field-error">{errors.password}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="field-error">{errors.confirmPassword}</span>
                )}
              </div>

              {/* Terms */}
              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="agreedToTerms"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                />
                <label htmlFor="agreedToTerms">
                  I agree to the{" "}
                  <a href="/terms">Terms of Service</a> and{" "}
                  <a href="/privacy">Privacy Policy</a>
                </label>
                {errors.agreedToTerms && (
                  <span className="field-error">{errors.agreedToTerms}</span>
                )}
              </div>

              <button type="submit" className="btn btn-primary btn-signup">
                Sign Up
              </button>

              <Link to="/registrar-login" className="btn btn-secondary btn-back">
                Back to Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
