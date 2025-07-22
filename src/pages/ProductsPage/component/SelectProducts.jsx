import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FilterByCategory({
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
        const { data } = await axios.get("http://localhost:3000/products/categories");
        const formattedCategories = data.map(catName =>({
          categoryCode: catName, 
          categoryName: catName
        }));
        setCategories(formattedCategories);
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
    <div className="container">
      <div className="flex-1">
        <label
          htmlFor="category"
        >
          קטגוריה
        </label>
        {isLoading && <p>טוען</p>}
        {error && <p className="error-message">{error}</p>}
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">כל הקטגוריות</option>
          {categories.map((c) => (
            <option value={c.categoryCode} key={c.categoryCode}>
              {c.categoryName}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => setSelectedCategory("")}
      >
        נקה 
      </button>
    </div>
  );
}
       