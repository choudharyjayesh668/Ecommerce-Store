import { useState } from "react";
import products from "../Products/products";
import ProductCard from "./ProductCard";

export default function ProductSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [toastMessage, setToastMessage] = useState("");

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const handleAddToCart = (product) => {
    setToastMessage(`${product.name} (₹${product.price}) added to quote list.`);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <section className="section" id="catalog-section">
      <div className="container">
        {/* Section Header & Category Filter Tabs */}
        <div className="catalog-header">
          <div>
            <span className="eyebrow">ENGINEERING SPECIFICATIONS</span>
            <h2 className="section-title">Featured Enclosures</h2>
            <p className="section-subtitle">
              Precision-stamped heavy-duty junction and ceiling housings built to rigorous industrial standards.
            </p>
          </div>

          <div className="catalog-filter-tabs" role="tablist">
            <button
              type="button"
              className={`filter-pill ${activeCategory === "all" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("all")}
              role="tab"
              aria-selected={activeCategory === "all"}
            >
              All Series ({products.length})
            </button>
            <button
              type="button"
              className={`filter-pill ${activeCategory === "fanbox" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("fanbox")}
              role="tab"
              aria-selected={activeCategory === "fanbox"}
            >
              FanBox ({products.filter((p) => p.category === "FanBox").length})
            </button>
            <button
              type="button"
              className={`filter-pill ${activeCategory === "spotbox" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("spotbox")}
              role="tab"
              aria-selected={activeCategory === "spotbox"}
            >
              SpotBox ({products.filter((p) => p.category === "SpotBox").length})
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="editorial-product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="editorial-toast" role="status" aria-live="polite">
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}