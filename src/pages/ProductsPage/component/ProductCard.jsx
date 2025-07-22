import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading">טוען...</div>;
  if (error) return <div className="error">שגיאה: {error}</div>;

  return (
    <div className="products-container">
      <h1 className="main-title">המוצרים שלנו</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.img}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <Link
                to={`/products/${product._id}`}
                className="view-details-btn"
              >
                הוסף לסל
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
