import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import img7 from "../../../Backend/public/images/IMG7.JPG";

export default function Login() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emptyEmail: "",
    emptyPassword: "",
    loginError: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    // Clear field-specific error upon typing
    if (error.emptyEmail || error.emptyPassword || error.loginError) {
      setError((prev) => ({
        ...prev,
        [name === "email" ? "emptyEmail" : "emptyPassword"]: "",
        loginError: "",
      }));
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const newError = {
      emptyEmail: "",
      emptyPassword: "",
      loginError: "",
    };
    let hasError = false;

    if (!userData.email.trim()) {
      newError.emptyEmail = "Email address is required";
      hasError = true;
    }
    if (!userData.password.trim()) {
      newError.emptyPassword = "Password is required";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    setIsLoading(true);
    setError({ emptyEmail: "", emptyPassword: "", loginError: "" });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/login`,
        {
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
      } else if (response.status === 200) {
        // Fallback if token is set in cookie
        localStorage.setItem("token", "authenticated");
        navigate("/store", { replace: true });
      }
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response?.status === 401) {
        setError((prev) => ({
          ...prev,
          loginError: "Invalid email or password. Please verify your credentials.",
        }));
      } else if (err.response?.data?.message) {
        setError((prev) => ({
          ...prev,
          loginError: err.response.data.message,
        }));
      } else {
        setError((prev) => ({
          ...prev,
          loginError: "Unable to connect to service. Please check your network.",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split-grid">
        {/* Left: Warm Paper Form Panel */}
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

          {/* Form Content */}
          <main className="auth-form-wrapper">
            <div className="auth-heading-group">
              <span className="eyebrow">FACTORY DIRECT ACCESS</span>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">
                Sign in with your email and password to access the complete catalog and manage quotes.
              </p>
            </div>

            {/* Global Alert Banner */}
            {error.loginError && (
              <div className="auth-alert-banner" role="alert">
                <svg className="auth-alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div>{error.loginError}</div>
              </div>
            )}

            <form className="auth-form" onSubmit={handleOnSubmit} noValidate>
              {/* Email Field */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="login-email">
                  Email Address
                </label>
                <div className={`auth-input-container ${error.emptyEmail ? "has-error" : ""}`}>
                  <svg className="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    className="auth-input"
                    placeholder="architect@firm.com"
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

              {/* Password Field */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="login-password">
                  Password
                </label>
                <div className={`auth-input-container ${error.emptyPassword ? "has-error" : ""}`}>
                  <svg className="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="auth-input"
                    placeholder="Enter your account password"
                    value={userData.password}
                    onChange={handleOnChange}
                    autoComplete="current-password"
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

              {/* Submit Button */}
              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isLoading}
                id="login-submit-button"
              >
                {isLoading ? (
                  <>
                    <span className="auth-spinner" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Catalog</span>
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
                Don't have an account?{" "}
                <Link to="/signup" className="auth-switch-link">
                  Create an account
                </Link>
              </p>
              <p className="auth-terms-text">
                By signing in you agree to Lakshmi Industries'{" "}
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
            src={img7}
            alt="Lakshmi Industries Heavy-Gauge Enclosure"
            className="auth-editorial-bg"
          />
          <div className="auth-editorial-overlay" />

          <div>
            <span className="auth-editorial-badge">ESTABLISHED 1998</span>
          </div>

          <div className="auth-editorial-content">
            <h2 className="auth-editorial-quote">
              Heavy-Gauge Steel. <em>Engineered</em> for Lifetime Rigidity.
            </h2>
            <p className="auth-editorial-desc">
              Precision-stamped deep-drawn FanBox and SpotBox junction housings certified to strict IS-standards for residential high-rises and industrial facilities.
            </p>

            <div className="auth-editorial-specs">
              <div className="auth-editorial-spec-item">
                <span className="auth-editorial-spec-dot" />
                <span>Heavy-gauge cold-rolled galvanized sheet</span>
              </div>
              <div className="auth-editorial-spec-item">
                <span className="auth-editorial-spec-dot" />
                <span>Precision conduit knockouts with grounding lug</span>
              </div>
              <div className="auth-editorial-spec-item">
                <span className="auth-editorial-spec-dot" />
                <span>Direct factory wholesale pricing & rapid dispatch</span>
              </div>
            </div>
          </div>

          <div className="auth-editorial-footer">
            <span>Lakshmi Industries • Engineering Division</span>
            <span>Commercial & Residential</span>
          </div>
        </div>
      </div>
    </div>
  );
}