import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import img1 from "../../../Backend/public/images/IMG1.JPG";

export default function Signup() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    cnfpassword: "",
  });

  const [error, setError] = useState({
    emptyUsername: "",
    emptyEmail: "",
    emptyPassword: "",
    emptyCnfPassword: "",
    passwordMismatch: "",
    signupError: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);

  // If already logged in, redirect directly to /store
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/store", { replace: true });
    }
  }, [navigate]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear corresponding error
    if (error.signupError) {
      setError((prev) => ({ ...prev, signupError: "" }));
    }
    if (name === "username" && error.emptyUsername) {
      setError((prev) => ({ ...prev, emptyUsername: "" }));
    }
    if (name === "email" && error.emptyEmail) {
      setError((prev) => ({ ...prev, emptyEmail: "" }));
    }
    if (name === "password") {
      setError((prev) => ({ ...prev, emptyPassword: "", passwordMismatch: "" }));
    }
    if (name === "cnfpassword") {
      setError((prev) => ({ ...prev, emptyCnfPassword: "", passwordMismatch: "" }));
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const newError = {
      emptyUsername: "",
      emptyEmail: "",
      emptyPassword: "",
      emptyCnfPassword: "",
      passwordMismatch: "",
      signupError: "",
    };
    let hasError = false;

    if (!userData.username.trim()) {
      newError.emptyUsername = "Full name is required";
      hasError = true;
    }

    if (!userData.email.trim()) {
      newError.emptyEmail = "Email address is required";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newError.emptyEmail = "Please enter a valid email address";
      hasError = true;
    }

    if (!userData.password.trim()) {
      newError.emptyPassword = "Password is required";
      hasError = true;
    } else if (userData.password.length < 6) {
      newError.emptyPassword = "Password must be at least 6 characters";
      hasError = true;
    }

    if (!userData.cnfpassword.trim()) {
      newError.emptyCnfPassword = "Confirm password is required";
      hasError = true;
    } else if (userData.password !== userData.cnfpassword) {
      newError.passwordMismatch = "Passwords do not match";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    setIsLoading(true);
    setError(newError);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/signup`,
        {
          username: userData.username.trim(),
          email: userData.email.trim().toLowerCase(),
          password: userData.password,
        },
        {
          withCredentials: true,
        }
      );

      // When token is generated, save it and redirect to /store
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        navigate("/store", { replace: true });
      } else {
        // Fallback: If backend returns success without token, redirect to login
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      if (err.response?.status === 409) {
        setError((prev) => ({
          ...prev,
          signupError: "An account with this email already exists. Please sign in instead.",
        }));
      } else if (err.response?.data?.message) {
        setError((prev) => ({
          ...prev,
          signupError: err.response.data.message,
        }));
      } else {
        setError((prev) => ({
          ...prev,
          signupError: "Unable to complete registration. Please check your connection.",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split-grid">
        {/* Left: Warm Paper Form Column */}
        <div className="auth-form-column">
          {/* Header Navigation */}
          <header className="auth-nav-header">
            <Link to="/" className="auth-brand-link" title="Lakshmi Industries">
              <div className="auth-brand-badge">LI</div>
              <span>Lakshmi Industries</span>
            </Link>
            <Link to="/" className="auth-back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              <span>Back to home</span>
            </Link>
          </header>

          {/* Main Form Wrapper */}
          <main className="auth-form-wrapper">
            <div className="auth-heading-group">
              <span className="eyebrow">NEW MEMBERSHIP</span>
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">
                Join contractor & engineering partners for factory direct procurement and custom quotes.
              </p>
            </div>

            {/* Global Alert Banner */}
            {error.signupError && (
              <div className="auth-alert-banner" role="alert">
                <svg className="auth-alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div>{error.signupError}</div>
              </div>
            )}

            <form className="auth-form" onSubmit={handleOnSubmit} noValidate>
              {/* Username / Full Name */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-username">
                  Full Name / Company
                </label>
                <div className={`auth-input-container ${error.emptyUsername ? "has-error" : ""}`}>
                  <svg className="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    id="signup-username"
                    type="text"
                    name="username"
                    className="auth-input"
                    placeholder="Suresh Electricals or Jane Doe"
                    value={userData.username}
                    onChange={handleOnChange}
                    autoComplete="name"
                    required
                  />
                </div>
                {error.emptyUsername && (
                  <p className="auth-field-error">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{error.emptyUsername}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-email">
                  Business Email
                </label>
                <div className={`auth-input-container ${error.emptyEmail ? "has-error" : ""}`}>
                  <svg className="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    className="auth-input"
                    placeholder="procurement@contractor.in"
                    value={userData.email}
                    onChange={handleOnChange}
                    autoComplete="email"
                    required
                  />
                </div>
                {error.emptyEmail && (
                  <p className="auth-field-error">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{error.emptyEmail}</span>
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-password">
                  Create Password
                </label>
                <div className={`auth-input-container ${error.emptyPassword || error.passwordMismatch ? "has-error" : ""}`}>
                  <svg className="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="auth-input"
                    placeholder="At least 6 characters"
                    value={userData.password}
                    onChange={handleOnChange}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {error.emptyPassword && (
                  <p className="auth-field-error">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{error.emptyPassword}</span>
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-cnfpassword">
                  Confirm Password
                </label>
                <div className={`auth-input-container ${error.emptyCnfPassword || error.passwordMismatch ? "has-error" : ""}`}>
                  <svg className="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="signup-cnfpassword"
                    type={showCnfPassword ? "text" : "password"}
                    name="cnfpassword"
                    className="auth-input"
                    placeholder="Repeat password"
                    value={userData.cnfpassword}
                    onChange={handleOnChange}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowCnfPassword(!showCnfPassword)}
                    aria-label={showCnfPassword ? "Hide password" : "Show password"}
                  >
                    {showCnfPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {error.emptyCnfPassword && (
                  <p className="auth-field-error">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{error.emptyCnfPassword}</span>
                  </p>
                )}
                {error.passwordMismatch && (
                  <p className="auth-field-error">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{error.passwordMismatch}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isLoading}
                id="signup-submit-button"
              >
                {isLoading ? (
                  <>
                    <span className="auth-spinner" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account & Access Store</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Switch Auth & Terms */}
            <div className="auth-footer-area">
              <p className="auth-switch-text">
                Already have an account?{" "}
                <Link to="/login" className="auth-switch-link">
                  Sign in
                </Link>
              </p>
              <p className="auth-terms-text">
                By creating an account you agree to Lakshmi Industries'{" "}
                <a href="#terms">Terms of Supply</a> and{" "}
                <a href="#privacy">Privacy Policy</a>.
              </p>
            </div>
          </main>

          {/* Footer Copyright */}
          <footer className="auth-copyright-bar">
            © {new Date().getFullYear()} Lakshmi Industries. All rights reserved.
          </footer>
        </div>

        {/* Right: Cinematic Near-Black Editorial Panel */}
        <div className="auth-editorial-column" aria-hidden="true">
          <img
            src={img1}
            alt="Lakshmi Industries Manufacturing"
            className="auth-editorial-bg"
          />
          <div className="auth-editorial-overlay" />

          <div>
            <span className="auth-editorial-badge">DIRECT FACTORY SUPPLY</span>
          </div>

          <div className="auth-editorial-content">
            <h2 className="auth-editorial-quote">
              Architectural Enclosures. <em>Zero</em> Structural Compromise.
            </h2>
            <p className="auth-editorial-desc">
              Join architects, MEP engineers, and building contractors who rely on Lakshmi Industries heavy-duty stamped steel junction boxes.
            </p>

            <div className="auth-editorial-specs">
              <div className="auth-editorial-spec-item">
                <span className="auth-editorial-spec-dot" />
                <span>Heavy-gauge cold-rolled galvanized steel</span>
              </div>
              <div className="auth-editorial-spec-item">
                <span className="auth-editorial-spec-dot" />
                <span>Precision knockout tooling for rapid onsite conduit fitting</span>
              </div>
              <div className="auth-editorial-spec-item">
                <span className="auth-editorial-spec-dot" />
                <span>Instant project volume quotes & dispatched consignments</span>
              </div>
            </div>
          </div>

          <div className="auth-editorial-footer">
            <span>Lakshmi Industries • Heavy Engineering</span>
            <span>Est. 1998</span>
          </div>
        </div>
      </div>
    </div>
  );
}