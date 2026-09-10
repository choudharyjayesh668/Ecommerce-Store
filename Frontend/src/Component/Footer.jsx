import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="editorial-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <h3 className="footer-brand-title">Lakshmi Industries</h3>
            <span className="footer-brand-tagline">HEAVY-GAUGE ELECTRICAL HARDWARE</span>
            <p className="footer-brand-desc">
              Precision-manufactured FanBox and SpotBox solutions engineered for high durability, structural rigidity, and contractor reliability.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/store" className="footer-link">Store Catalog</Link></li>
              <li><a href="/fanbox" className="footer-link">FanBox Series</a></li>
              <li><a href="/spotbox" className="footer-link">SpotBox Series</a></li>
            </ul>
          </div>

          {/* Specifications & Standards Column */}
          <div>
            <h4 className="footer-col-title">Standards</h4>
            <ul className="footer-links-list">
              <li><span className="footer-text">16-Gauge CRCA Steel</span></li>
              <li><span className="footer-text">Zinc Electro-Galvanized</span></li>
              <li><span className="footer-text">Concentric Knockouts</span></li>
              <li><span className="footer-text">IS Compliant Specs</span></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="footer-col-title">Factory & Sales</h4>
            <ul className="footer-links-list">
              <li><span className="footer-text">Bengaluru, Karnataka, India</span></li>
              <li><a href="tel:+918660629894" className="footer-link">+91 8660629894</a></li>
              <li><a href="mailto:support@lakshmiindustries.com" className="footer-link">support@lakshmiindustries.com</a></li>
            </ul>
          </div>
        </div>

        {/* Quiet Divider */}
        <div className="footer-divider" />

        {/* Bottom Row */}
        <div className="footer-bottom-row">
          <div>
            © 2026 Lakshmi Industries. All Rights Reserved. Heavy Electrical Enclosures.
          </div>
          <div className="footer-social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-link">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-link">Facebook</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-link">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}