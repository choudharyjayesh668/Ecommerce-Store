export default function IndustrialTrustSection() {
  const specs = [
    {
      number: "01",
      title: "Galvanized Heavy Gauge",
      desc: "Fabricated from deep-draw CRCA sheet steel with uniform wall thickness to resist torsion under concrete pour stress.",
    },
    {
      number: "02",
      title: "Precision Conduit Knockouts",
      desc: "Clean-edge concentric punchouts formatted for 20mm and 25mm PVC and rigid steel conduits without distortion.",
    },
    {
      number: "03",
      title: "Anti-Corrosion Passivation",
      desc: "Multi-stage pre-treatment and zinc electro-galvanization providing high salt-spray resistance in high-humidity climates.",
    },
    {
      number: "04",
      title: "Structural Ceiling Anchor",
      desc: "Reinforced fan-hook load test rated up to 120 kg dynamic load, exceeding standard domestic and commercial safety codes.",
    },
  ];

  return (
    <>
      {/* Dark Immersive Section: Manufacturing & Engineering Trust */}
      <section className="section trust-section" id="specifications">
        <div className="container">
          <span className="eyebrow eyebrow-dark">MANUFACTURING & QUALITY COMPLIANCE</span>
          <h2 className="section-title section-title-dark">Engineered for Concrete Permanence.</h2>
          <p className="section-subtitle section-subtitle-dark">
            Every electrical enclosure undergoes dimensional inspection, weld-strength tests, and coating verification before leaving the manufacturing floor.
          </p>

          <div className="trust-grid">
            {specs.map((item) => (
              <div key={item.number} className="trust-item">
                <span className="trust-number">{item.number} // SPECIFICATION</span>
                <h3 className="trust-title">{item.title}</h3>
                <p className="trust-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Bulk Enquiry Transition Banner */}
      <section className="quote-banner-section" id="quote-section">
        <div className="container">
          <div className="quote-banner-inner">
            <div className="quote-banner-copy">
              <span className="eyebrow eyebrow-dark">DIRECT FACTORY SUPPLY</span>
              <h2 className="quote-banner-title">Architectural & Contractor Inquiries</h2>
              <p className="quote-banner-body">
                Supplying bulk pallets to electrical contractors, residential developers, and industrial projects across India. Contact our sales engineering desk for volume pricing, CAD drawings, and test certificates.
              </p>
            </div>

            <div className="quote-banner-actions">
              <a
                href="mailto:support@lakshmiindustries.com?subject=Bulk%20Enquiry%20Lakshmi%20Industries"
                className="btn-pill btn-light"
              >
                Request Quote
              </a>
              <a
                href="tel:+918660629894"
                className="btn-pill btn-outline-dark"
              >
                +91 8660629894
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
