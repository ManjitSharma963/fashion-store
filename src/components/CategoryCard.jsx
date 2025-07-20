import React from "react";
import "../styles/categoryCard.css";

const CategoryCard = ({ category }) => (
  <div className="category-card">
    <img src={category.image} alt={category.name} className="category-image" />
    <h3>{category.name}</h3>
    <p>{category.count} items</p>
  </div>
);

export default CategoryCard;