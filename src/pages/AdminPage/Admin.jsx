import { useEffect, useState } from "react";
import AdminUsers from "./components/AdminUsers";
import AdminCategories from "./components/AdminCategories";
import AdminProducts from "./components/AdminProducts";
import AdminSidebarButton from "./components/AdminSidebarButton";
import { api } from "../../utils/api";
import "./Admin.css";

const sections = ["users", "categories", "products"];

export default function AdminPage() {
  const [currentSection, setCurrentSection] = useState("users");
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      setCatLoading(true);
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (err) {
        setCatError("אחזור קטגוריות נכשל");
      }
      setCatLoading(false);
    };
    fetchCategories();
  }, []);

  const handleCategoryUpdated = async (categoryCode, newName) => {
    try {
      await api.put(`/categories/${categoryCode}`, {
        name: newName,
      });
      setCategories((prev) => {
        return prev.map((c) =>
          c.categoryCode === categoryCode ? { ...c, name: newName } : c
        );
      });
    } catch {
      alert("Failed to update category");
    }
  };

  const handleCategoryAdd = async (newCategory) => {
    try {
      const { data } = await api.post("/categories", newCategory);
      setCategories((prev) => {
        return [...prev, data];
      });
    } catch {
      alert("Failed to add category");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 font-sans flex">
      {/* Sidebar */}
      <aside className="w-48 mr-8">
        <nav className="flex flex-col gap-2">
          {sections.map((section) => (
            <AdminSidebarButton
              onClick={() => setCurrentSection(section)}
              active={section === currentSection}
              label={section}
            />
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1">
        <h1 className="text-3xl font-bold text-center mb-10">
          Admin Dashboard
        </h1>
        {currentSection === "users" && <AdminUsers />}
        {currentSection === "categories" && (
          <AdminCategories
            categories={categories}
            catLoading={catLoading}
            catError={catError}
            onCategoryUpdated={handleCategoryUpdated}
            onCategoryAdd={handleCategoryAdd}
          />
        )}
        {currentSection === "products" && (
          <AdminProducts
            categories={categories}
            catLoading={catLoading}
            catError={catError}
          />
        )}
      </main>
    </div>
  );
}
