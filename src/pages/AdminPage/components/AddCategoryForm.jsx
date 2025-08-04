import { useState } from "react";

export default function AddCategoryForm({ onCategoryAdd }) {
  const [form, setForm] = useState({ name: "", categoryCode: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!form.name || !form.categoryCode) {
        setError("Name and code required");
        setLoading(false);
        return;
      }
      await onCategoryAdd(form);
      setForm({ name: "", categoryCode: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-category-form">
      <input
        className="add-category-input"
        placeholder="Category Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        className="add-category-input"
        placeholder="Category Code"
        name="categoryCode"
        value={form.categoryCode}
        onChange={handleChange}
        disabled={loading}
      />
      <button
        type="submit"
        className="add-category-button"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Category"}
      </button>
      {error && <span className="add-category-error">{error}</span>}
    </form>
  );
}