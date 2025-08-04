import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import AddProductForm from "./AddProductForm";

export default function AdminProducts({
  categories = [],
  catLoading,
  catError,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading)
    return <div className="admin-products-loading">Loading products...</div>;
  if (error)
    return <div className="admin-products-error">{error}</div>;
  if (catLoading)
    return <div className="admin-products-loading">Loading categories...</div>;
  if (catError)
    return <div className="admin-products-error">{catError}</div>;

  const handleProductUpdated = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const handleProductDeleted = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleAddProduct = async (form, setError, resetForm) => {
    try {
      const { data } = await api.post("/products", {
        ...form,
        price: Number(form.price),
      });
      setProducts((prev) => [...prev, data]);
      resetForm({ name: "", price: "", image: "", categoryCode: "" });
    } catch (err) {
      setError("Failed to add product");
    }
  };

  return (
    <section className="admin-products-section">
      <h2 className="admin-products-title">
        <i className="fa-solid fa-box"></i> Products
      </h2>
      <AddProductForm
        onProductAdded={handleAddProduct}
        categories={categories}
      />
      <div className="admin-products-grid">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onProductUpdated={handleProductUpdated}
            onProductDeleted={handleProductDeleted}
            categories={Array.isArray(categories) ? categories : []}
          />
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onProductUpdated,
  onProductDeleted,
  categories,
}) {
  const [editing, setEditing] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
    categoryCode: product.categoryCode || "",
  });
  const [loading, setLoading] = useState(false);

  const handleEdit = () => setEditing(true);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setForm((f) => ({ ...f, categoryCode: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!form.categoryCode) {
        setFormError("Please select a category");
        setLoading(false);
        return;
      }
      if (form.price < 0) {
        setFormError("Price must be greater than 0");
        setLoading(false);
        return;
      }
      await api.put(`/products/${product._id}`, { ...product, ...form });
      setEditing(false);
      onProductUpdated(product._id, form);
    } catch {
      alert("Failed to update product");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete product '${product.name}'?`)) return;
    setLoading(true);
    try {
      await api.delete(`/products/${product._id}`);
      onProductDeleted(product._id);
    } catch {
      alert("Failed to delete product");
    }
    setLoading(false);
  };

  return (
    <div className="product-card">
      {editing ? (
        <form
          onSubmit={handleSubmit}
          className="product-card-edit-form"
        >
          {/* ודא שקומפוננטת Error מקבלת את ה-prop הנכון */}
          {formError && <Error error={formError} />}
          <input
            className="product-card-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            className="product-card-input"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            className="product-card-input"
            name="image"
            value={form.image}
            onChange={handleChange}
            disabled={loading}
          />
          <CategorySelect
            value={form.categoryCode}
            categories={categories}
            onChange={handleCategoryChange}
            disabled={loading}
          />
          <button
            type="submit"
            className="product-card-submit-button"
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
      ) : (
        <>
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image"
          />
          <div className="product-card-info">
            <div className="product-card-name">{product.name}</div>
            <div className="product-card-category">
              {
                categories.find((c) => c.categoryCode === product.categoryCode)
                  ?.name
              }
            </div>
          </div>{" "}
          <div className="product-card-price">${product.price}</div>
          <div className="product-card-actions">
            <button
              className="product-card-edit-button"
              title="Edit"
              onClick={handleEdit}
            >
              <i className="fa-solid fa-pen"></i>
            </button>
            <button
              className="product-card-delete-button"
              title="Delete"
              onClick={handleDelete}
              disabled={loading}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function CategorySelect({ value, categories, onChange, disabled }) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="category-select"
    >
      <option value="">Select a category</option>
      {categories.map((c) => (
        <option key={c.categoryCode} value={c.categoryCode}>
          {c.name}
        </option>
      ))}
    </select>
  );
}