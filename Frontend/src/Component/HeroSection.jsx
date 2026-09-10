import img1 from "../assets/IMG1.JPG";

export default function HeroSection() {
  const scrollToProducts = (e) => {
    e.preventDefault();
    const el = document.getElementById("catalog-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToQuote = (e) => {
    e.preventDefault();
    const el = document.getElementById("quote-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="editorial-hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left: Editorial Copy */}
          <div className="hero-copy">
            <span className="eyebrow">INDUSTRIAL & ARCHITECTURAL ELECTRICAL</span>
            
            <h1 className="hero-heading">
              Heavy-Gauge Electrical Enclosures.
            </h1>

            <p className="hero-subhead">
              Premium FanBox & SpotBox Solutions
            </p>

            <p className="hero-description">
              Manufacturing precision-formed electrical junction and ceiling boxes engineered for maximum durability, structural rigidity, and enduring safety across residential and commercial developments.
            </p>

            {/* 56px Pill CTA buttons */}
            <div className="hero-cta-group">
              <a
                href="#catalog-section"
                onClick={scrollToProducts}
                className="btn-pill btn-dark"
              >
                Explore Catalog
              </a>
              <a
                href="#quote-section"
                onClick={scrollToQuote}
                className="btn-pill btn-outline"
              >
                Bulk Enquiries
              </a>
            </div>

            {/* Specification / Trust Chips */}
            <div className="hero-specs-row">
              <div className="hero-spec-item">
                <span className="hero-spec-bullet" />
                <span>Heavy Gauge Galvanized Steel</span>
              </div>
              <div className="hero-spec-item">
                <span className="hero-spec-bullet" />
                <span>8+ Years Manufacturing Mastery</span>
              </div>
              <div className="hero-spec-item">
                <span className="hero-spec-bullet" />
                <span>Precision Conduit Knockouts</span>
              </div>
              <div className="hero-spec-item">
                <span className="hero-spec-bullet" />
                <span>100% Made in India</span>
              </div>
            </div>
          </div>

          {/* Right: Square Editorial Product Showcase */}
          <div className="hero-showcase-frame">
            <img
              src={img1}
              alt="Lakshmi Industries Heavy Duty Enclosure"
              className="hero-showcase-img"
            />
            <div className="hero-showcase-badge">
              SERIES 01 — HEAVY DUTY SPECIFICATION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}