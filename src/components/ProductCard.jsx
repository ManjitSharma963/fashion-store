import React from "react";
import "../styles/productCard.css";

const ProductCard = ({ product }) => {
  const placeholderImage = "/images/placeholder.jpg"; // Fallback image

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image || placeholderImage}
          alt={product.name || "No Image Available"}
          className="product-image"
        />
        {product.isOnSale && <span className="badge sale">Sale</span>}
      </div>
      <div className="product-details">
        <h3>{product.name || "No Name Available"}</h3>
        <p className="product-price">
          {product.isOnSale ? (
            <>
              <span className="sale-price">{product.salePrice}</span>
              <span className="original-price">{product.price}</span>
            </>
          ) : (
            product.price || "Price Not Available"
          )}
        </p>
        <div className="product-options">
          <div className="color-options">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className="color-circle"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>
          <div className="size-options">
            {product.sizes.map((size, index) => (
              <span key={index} className="size-circle">
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;