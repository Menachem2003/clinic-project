import React, { useEffect, useState } from "react";
import { api } from "../../../utils/api";

export default function SelectProducts({
  setSelectedCategory,
  selectedCategory,
}) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get("categories");

        setCategories(data);
      } catch (err) {
        console.log(err);
        if (err.status === 404) {
          setError("Categories not found");
          return;
        }
        setError("something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      {isLoading && <p className="filter-loading">טוען</p>}
      {error && <p className="filter-error-message">{error}</p>}
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="input-filter-product"
        aria-label="בחר קטגוריה"
      >
        <option value="">כל הקטגוריות</option>
        {categories.map(({ name, categoryCode, _id }, index) => (
          <option key={_id} value={categoryCode}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
}
