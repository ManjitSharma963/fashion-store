import React from "react";
import "../styles/categoryCard.css";

const CategoryCard = ({ category, onCategoryClick }) => {
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
    <div className="category-card" onClick={handleClick}>
      <img src={category.image} alt={category.name} className="category-image" />
      <h3>{category.name}</h3>
    </div>
  );
};

export default CategoryCard;