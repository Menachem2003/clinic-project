
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="product-card-link">
      <div key={product._id} className="product-card">
        <div className="product-image-container">
          <img src={product.img} alt={product.name} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <button className="view-details-btn" onClick={(e) => e.preventDefault()}>
            הוסף לסל
          </button>
        </div>
      </div>
    </Link>
  );
}

