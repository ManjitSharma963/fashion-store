import React from "react";
import "../styles/categoryCard.css";

const CategoryCard = ({ category, onCategoryClick, featured = false }) => {
  const handleClick = () => {
    if (onCategoryClick) {
      onCategoryClick(category);
    } else {
      // Default behavior - navigate to category page
      console.log("Category clicked:", category.name);
      // You can add navigation logic here when routing is implemented
      // window.location.href = `/category/${category.id}`;
    }
  };

  return (
    <div className={`category-card ${featured ? 'featured' : ''}`} onClick={handleClick}>
      <div className="category-image-container">
        <img src={category.image} alt={category.name} className="category-image" />
        <div className="category-overlay"></div>
        {category.isNew && <div className="category-badge new">New</div>}
        {category.isTrending && <div className="category-badge trending">Trending</div>}
      </div>
      <div className="category-content">
        <h3>{category.name}</h3>
        <p className="category-description">
          Discover amazing {category.name.toLowerCase()} collection
        </p>
        <div className="category-meta">
          <span className="category-count">{category.count || 0} items</span>
          <div className="category-arrow">→</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;