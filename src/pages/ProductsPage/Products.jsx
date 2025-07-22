import ProductCard from "./component/ProductCard";
import SelectProducts from "./component/SelectProducts"
import "./Products.css";
import axios from "axios";
import React, {useState, useEffect} from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() =>{
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("http://localhost:3000/products");
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
      currentFiltered = currentFiltered.filter(
        (product) => { product.category === selectedCategory 
    }
  );
}
    setFilteredProducts(currentFiltered);
  }, [selectedCategory, products]);
  

  return (
    <div className="products-container">
      <SelectProducts
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
       />
        {isLoading && <p>טוען מוצרים...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="product-list-display">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) =>(
              <ProductCard key={product._id} product={product}/>
            ))
          ): (
            !isLoading && !error && <p>לא נמצאו מוצרים תואמים בקטגוריה זו.</p>
          )}
      </div>
    </div>
  );
}

export default Products;
