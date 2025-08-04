import React, { useState } from "react";
import { api } from "../../../utils/api";
import AddCategoryForm from "./AddCategoryForm";

export default function AdminCategories({
  categories = [],
  catLoading,
  catError,
  onCategoryUpdated,
  onCategoryAdd,
}) {
  if (catLoading)
    return (
      <div className="admin-categories-loading">Loading categories...</div>
    );
  if (catError) return <div className="admin-categories-error">{catError}</div>;

  return (
    <section className="admin-categories-section">
      <h2 className="admin-categories-title">
        <i className="fa-solid fa-tags"></i> Categories
      </h2>
      <AddCategoryForm onCategoryAdd={onCategoryAdd} />
      <div className="admin-categories-table-container">
        <table className="admin-categories-table">
          <thead className="admin-categories-table-header">
            <tr>
              <th className="admin-categories-table-th">Name</th>
              <th className="admin-categories-table-th">Code</th>
              <th className="admin-categories-table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <Category
                key={c.categoryCode}
                category={c}
                onCategoryUpdated={onCategoryUpdated}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Category({ category, onCategoryUpdated }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => setEditing(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onCategoryUpdated(category.categoryCode, name);
      setEditing(false);
    } catch {
      alert("Failed to update category");
    }
    setLoading(false);
  };

  if (editing) {
    return (
      <tr className="category-row-editing">
        <td className="category-cell-editing">
          <form onSubmit={handleSubmit} className="category-edit-form">
            <input
              className="category-edit-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="category-edit-button"
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </form>
        </td>
        <td className="category-cell">{category.categoryCode}</td>
        <td className="category-cell"></td>
      </tr>
    );
  }
  return (
    <tr className="category-row">
      <td className="category-cell">{category.name}</td>
      <td className="category-cell">{category.categoryCode}</td>
      <td className="category-cell">
        <button
          className="category-edit-icon-button"
          title="Edit"
          onClick={handleEdit}
        >
          <i className="fa-solid fa-pen"></i>
        </button>
      </td>
    </tr>
  );
}
