import React from "react";
import "../styles/categoryGrid.css";

const CategoryGrid = ({ categories }) => {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <div key={category.id} className="category-card">
          <img
            src={category.image || "/images/placeholder.jpg"}
            alt={category.name || "No Image Available"}
            className="category-image"
          />
          <h3>{category.name || "No Name Available"}</h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;