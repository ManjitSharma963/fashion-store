import React from "react";
import CategoryCard from "./CategoryCard";
import "../styles/categoryGrid.css";

const CategoryGrid = ({ categories, onCategoryClick }) => {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <CategoryCard 
          key={category.id} 
          category={category} 
          onCategoryClick={onCategoryClick}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;