import { useParams } from "react-router-dom";
import { api } from "../../../utils/api";
import { useState, useEffect } from "react";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.data);
      } catch (err) {
        console.error("Failed to fetch product");
        if (err.response) {
          setError("שגיאה בטעינת מוצר");
        } else if (err.request) {
          setError(
            "שגיאת רשת: לא ניתן להתחבר לשרת כעת, אנא נסה במועד מאוחר יותר"
          );
        } else {
          setError("בניית הבקשה נכשלה");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div> טוען את פרטי המוצר...</div>;
  }

  if (error) {
    return <div> שגיאה </div>;
  }

  if (!product) {
    return <div>מוצר זה לא נמצא במערכת.</div>;
  }
  return (
    <div>
      <h1>דף פרטי מוצר</h1>
      <h1>{product.name}</h1>
      <img
        src={product.img}
        alt={product.name}
        style={{ maxWidth: "400px", height: "auto" }}
      />
      <p>
        <strong>תיאור:</strong> {product.description}
      </p>
      <p>
        <strong>מחיר:</strong> {product.price}
      </p>
      <p>
        <strong>כמות:</strong> {product.count}
      </p>
      <p>
        <strong>קטגוריה:</strong> {product.category}
      </p>
    </div>
  );
}

export default ProductPage;
