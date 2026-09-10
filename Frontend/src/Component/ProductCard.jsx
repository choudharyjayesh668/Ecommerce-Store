import { useState } from "react";

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleAction = (e) => {
    e.preventDefault();
    setAdded(true);
    if (onAddToCart) onAddToCart(product);
    setTimeout(() => setAdded(false), 2000);
  };

  // Technical specification cues based on category
  const isFanBox = product.category === "FanBox";
  const gaugeSpec = isFanBox ? "16-Gauge CRCA" : "18-Gauge Zinc";
  const depthSpec = isFanBox ? "Depth: 65mm" : "Depth: 45mm";
  const knockouts = isFanBox ? "4× 25mm Knockouts" : "2× 20mm Knockouts";
  
  return (
    <article className="editorial-product-card">
      {/* Square-cornered media wrapper */}
      <div className="card-media-wrapper">
        <img
          src={`${import.meta.env.VITE_API}${product.image}`}
          alt={product.name}
          className="card-product-img"
          loading="lazy"
        />
        <span className="card-category-tag">{product.category}</span>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div className="card-title-row">
          <h3 className="card-product-title">{product.name}</h3>
          <span className="card-product-price">₹{product.price}</span>
        </div>

        {/* Industrial Specification Badges */}
        <div className="card-specs-list">
          <span className="card-spec-badge">{gaugeSpec}</span>
          <span className="card-spec-badge">{depthSpec}</span>
          <span className="card-spec-badge">{knockouts}</span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className={`card-action-btn ${added ? "is-added" : ""}`}
          onClick={handleAction}
          aria-label={`Add ${product.name} to order inquiry`}
        >
          {added ? "Added to Quote List ✓" : "Add to Order / Enquire"}
        </button>
      </div>
    </article>
  );
}