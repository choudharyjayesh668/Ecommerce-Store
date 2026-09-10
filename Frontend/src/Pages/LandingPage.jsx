import NavBar from "../Component/NavBar";
import HeroSection from "../Component/HeroSection";
import ProductSection from "../Component/ProductSection";
import IndustrialTrustSection from "../Component/IndustrialTrustSection";
import Footer from "../Component/Footer";

export default function LandingPage() {
  return (
    <div className="site-wrapper">
      <NavBar />
      <main>
        <HeroSection />
        <ProductSection />
        <IndustrialTrustSection />
      </main>
      <Footer />
    </div>
  );
}