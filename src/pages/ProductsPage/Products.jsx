import { api } from "../../utils/api";
import ProductCard from "./component/ProductCard";
import SelectProducts from "./component/SelectProducts";
import "./Products.css";
import React, { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get("products");
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("שגיאה בטעינת המוצרים:", err);
        setError("לא ניתן לטעון מוצרים מהשרת.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let currentFiltered = products;

    if (selectedCategory) {
      currentFiltered = currentFiltered.filter((product) => {
        return product.category === selectedCategory;
      });
    }

    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      currentFiltered = currentFiltered.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedSearchTerm) ||
          product.description.toLowerCase().includes(lowercasedSearchTerm)
      );
    }

    setFilteredProducts(currentFiltered);
  }, [selectedCategory, products, searchTerm]);

  return (
    <div className="products-container">
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {isLoading && <p>טוען מוצרים...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="products-grid">
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          : !isLoading && !error && <p>לא נמצאו מוצרים תואמים לחיפוש שלך.</p>}
      </div>
    </div>
  );
}

export default Products;

function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
<div className="product-search-container">
      <div className="search-input-group">
        <label htmlFor="search" className="search-label">
          חיפוש מוצר
        </label>
        <div className="search-and-select-wrapper">
          <input
            type="text"
            id="search"
            placeholder="הקלד שם מוצר או תיאור..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-filter-product"
            aria-label="חיפוש מוצרים"
          />
          <SelectProducts
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
    </div>
  );
}
