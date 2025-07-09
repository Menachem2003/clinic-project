import { useEffect, useState } from "react";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/categories")
      .then((res) => res.json())
      .then((obj) => setCategories(obj.data));
  }, []);

  return (
    <div className="categories-section">
      <h2 className="section-title">השירותים שלנו</h2>

      <div className="cards-container">
        {categories.map((category) => (
          <div key={category._id} className="category-card">
            <h3 className="service-title">{category.name}</h3>
            <p className="category-description">{category.description}</p>
            <img src={category.img} alt={category.name} className="category-img" />
          </div>
        ))}
      </div>
    </div>
  );
}
