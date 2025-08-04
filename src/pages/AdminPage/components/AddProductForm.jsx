import { useState } from "react";

export default function AddProductForm({ onProductAdded, loading, categories }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    categoryCode: "",
    count: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (!form.name || !form.price || !form.categoryCode) {
        setError("All fields required");
        setSubmitting(false);
        return;
      }
      if (Number(form.price) < 0) {
        setError("Price must be positive");
        setSubmitting(false);
        return;
      }
      await onProductAdded(form, setError, setForm);
      setForm({ name: "", price: "", image: "", categoryCode: "", count: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input
        className="add-product-input"
        placeholder="Product Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        disabled={loading || submitting}
      />
      <input
        className="add-product-input"
        placeholder="Price"
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        disabled={loading || submitting}
      />
      <input
        className="add-product-input"
        placeholder="Image URL"
        name="image"
        value={form.image}
        onChange={handleChange}
        disabled={loading || submitting}
      />
      <select
        className="add-product-select"
        name="categoryCode"
        value={form.categoryCode}
        onChange={handleChange}
        disabled={loading || submitting}
      >
        <option value="">Select Category</option>
        {Array.isArray(categories) && categories.map((c) => (
          <option key={c.categoryCode} value={c.categoryCode}>
            {c.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="add-product-button"
        disabled={loading || submitting}
      >
        {(loading || submitting) ? "Adding..." : "Add Product"}
      </button>
      {error && <span className="add-product-error">{error}</span>}
    </form>
  );
}