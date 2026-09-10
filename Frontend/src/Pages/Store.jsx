import NavBar from "../Component/NavBar";
import ProductSection from "../Component/ProductSection";
import Footer from "../Component/Footer";

export default function Store() {
  return (
    <div className="site-wrapper">
      <NavBar />
      <main style={{ paddingTop: "40px" }}>
        <div className="container" style={{ marginBottom: "16px" }}>
          <span className="eyebrow">FACTORY DIRECT STORE</span>
          <h1 className="section-title">Complete Catalog</h1>
          <p className="section-subtitle">
            Browse all heavy-duty junction boxes, ceiling fan housings, and spot enclosures ready for dispatch.
          </p>
        </div>
        <ProductSection />
      </main>
      <Footer />
    </div>
  );
}