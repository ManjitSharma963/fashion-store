import React from "react";
import CategoryCard from "./CategoryCard";
import "../styles/categoryGrid.css";

const CategoryGrid = ({ categories, onCategoryClick }) => {
  return (
    <section className="categories" id="categories">
      <div className="container">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p className="categories-subtitle">
            Explore our carefully curated categories designed to match your lifestyle and preferences
          </p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              onCategoryClick={onCategoryClick}
              featured={index === 0}
            />
          ))}
        </div>
        <div className="view-all-categories">
          <a href="#all-categories" className="view-all-btn">
            View All Categories
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;