import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollToQuote = (e) => {
    const el = document.getElementById("quote-section");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="editorial-navbar">
      <div className="navbar-inner">
        {/* Brand Wordmark */}
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-mark">LI</div>
          <span className="navbar-brand-text">Lakshmi Industries</span>
        </Link>

        {/* Desktop Category / Store Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          <Link to="/store" className="navbar-link">Store</Link>
          <a href="/fanbox" className="navbar-link">FanBox</a>
          <a href="/spotbox" className="navbar-link">SpotBox</a>
        </nav>

        {/* Functional Search Box */}
        <div className="navbar-search">
          <svg
            className="navbar-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search catalog..."
            className="navbar-search-input"
            aria-label="Search catalog"
          />
        </div>

        {/* Auth & Primary CTA */}
        <div className="navbar-actions">
          {localStorage.getItem("token") ? (
            <>
              <Link to="/store" className="navbar-auth-link" style={{ fontWeight: 600 }}>
                Store Catalog
              </Link>
              <button
                type="button"
                className="navbar-auth-link"
                style={{ cursor: "pointer", background: "none", border: "none" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-auth-link">Login</Link>
              <Link to="/signup" className="navbar-auth-link">Signup</Link>
            </>
          )}
          <a
            href="#quote-section"
            onClick={handleScrollToQuote}
            className="btn-pill btn-pill-compact btn-dark"
          >
            Request Quote
          </a>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`hamburger-line ${mobileMenuOpen ? "open-top" : ""}`} />
            <span className={`hamburger-line ${mobileMenuOpen ? "open-mid" : ""}`} />
            <span className={`hamburger-line ${mobileMenuOpen ? "open-bot" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar-mobile-drawer ${mobileMenuOpen ? "is-open" : ""}`}>
        <div className="navbar-mobile-search">
          <input
            type="text"
            placeholder="Search FanBox & SpotBox..."
            aria-label="Mobile search"
          />
        </div>
        <div className="navbar-mobile-nav">
          <Link
            to="/store"
            className="navbar-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Store
          </Link>
          <a
            href="/fanbox"
            className="navbar-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            FanBox Series
          </a>
          <a
            href="/spotbox"
            className="navbar-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            SpotBox Series
          </a>
          {localStorage.getItem("token") ? (
            <button
              type="button"
              className="navbar-mobile-link"
              style={{ textAlign: "left", cursor: "pointer", background: "none", border: "none" }}
              onClick={() => {
                setMobileMenuOpen(false);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Logout Account
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="navbar-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Account Login
              </Link>
              <Link
                to="/signup"
                className="navbar-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Account
              </Link>
            </>
          )}
          <a
            href="#quote-section"
            className="btn-pill btn-dark"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleScrollToQuote(e);
            }}
          >
            Request Bulk Quote
          </a>
        </div>
      </div>
    </header>
  );
}