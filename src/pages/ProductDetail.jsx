import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(productId));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]);
      setSelectedSize(foundProduct.sizes[0]);
    }
  }, [productId]);

  if (!product) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Product Not Found</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select color and size");
      return;
    }
    // Add to cart logic here (e.g., localStorage or context)
    alert("Product added to cart!");
  };

  return (
    <div style={{ padding: 40 }}>
      <img src={product.image} alt={product.name} style={{ maxWidth: 300 }} />
      <h1>{product.name}</h1>
      <div>
        {product.salePrice ? (
          <>
            <span style={{ color: "red", fontWeight: 600 }}>${product.salePrice}</span>
            <span style={{ textDecoration: "line-through", marginLeft: 8 }}>${product.price}</span>
          </>
        ) : (
          <span>${product.price}</span>
        )}
      </div>
      <div>
        <label>Color: </label>
        {product.colors.map(color => (
          <button
            key={color}
            style={{
              background: color,
              border: selectedColor === color ? "2px solid #333" : "1px solid #ccc",
              width: 24, height: 24, margin: 2
            }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
      <div>
        <label>Size: </label>
        {product.sizes.map(size => (
          <button
            key={size}
            style={{
              fontWeight: selectedSize === size ? "bold" : "normal",
              margin: 2
            }}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
      <div>
        <label>Qty: </label>
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <span style={{ margin: "0 8px" }}>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <button onClick={handleAddToCart} style={{ marginTop: 16 }}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail; 