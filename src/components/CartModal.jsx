import React from "react";
import "../styles/cartModal.css";

const mockCartItems = [];

const CartModal = ({
  cartItems = mockCartItems,
  onClose = () => {},
  onQtyChange = () => {},
  onRemove = () => {},
  onCheckout = () => {},
}) => {
  let total = cartItems.reduce((sum, item) => {
    const price = Number(item.price);
    return sum + (isNaN(price) ? 0 : price * item.qty);
  }, 0);
  if (isNaN(total)) total = 0;

  return (
    <div className="cart-modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cart-modal">
        <button className="cart-modal-close" onClick={onClose}>×</button>
        <div className="cart-modal-content">
          {/* Left: Cart Items */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <span>Product</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Total</span>
            </div>
            <div className="cart-items-list">
              {cartItems.map(item => {
                const price = Number(item.price);
                const priceDisplay = isNaN(price) ? '0.00' : price.toFixed(2);
                const itemTotal = isNaN(price) ? 0 : price * item.qty;
                const itemTotalDisplay = isNaN(itemTotal) ? '0.00' : itemTotal.toFixed(2);
                return (
                  <div className="cart-item-row" key={item.id}>
                    <div className="cart-item-product">
                      <div className="cart-item-image-wrap">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <button className="cart-item-remove" onClick={() => onRemove(item.id)}>×</button>
                      </div>
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-sku">{item.sku}</div>
                        <div className="cart-item-meta">
                          Size: {item.size} &nbsp; • &nbsp; Color: {item.color}
                        </div>
                      </div>
                    </div>
                    <div className="cart-item-price">${priceDisplay}</div>
                    <div className="cart-item-qty">
                      <button onClick={() => onQtyChange(item.id, item.qty - 1)} disabled={item.qty <= 1}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => onQtyChange(item.id, item.qty + 1)}>+</button>
                    </div>
                    <div className="cart-item-total">${itemTotalDisplay}</div>
                  </div>
                );
              })}
            </div>
            <div className="cart-add-note">
              <label htmlFor="cart-note">Add a note</label>
              <input id="cart-note" type="text" placeholder="Some words to In House team" />
            </div>
          </div>
          {/* Right: Summary */}
          <div className="cart-summary-section">
            <div className="cart-summary-bar" />
            <div className="cart-summary-total-label">Cart Total</div>
            <div className="cart-summary-total">${isNaN(total) ? '0.00' : total.toFixed(2)}</div>
            <div className="cart-summary-note">Shipping & taxes calculated at checkout</div>
            <div className="cart-summary-terms">
              <input type="checkbox" id="cart-terms" />
              <label htmlFor="cart-terms">I agree to <span>Terms & Conditions</span></label>
            </div>
            <button className="cart-summary-checkout" onClick={onCheckout}>Checkout</button>
            <button className="cart-summary-paypal">
              <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" />
              PayPal
            </button>
            <div className="cart-summary-bag-icon">
              <svg width="80" height="80" fill="none" stroke="#fff" strokeWidth="2" opacity="0.15" viewBox="0 0 24 24"><path d="M6 7V6a6 6 0 1 1 12 0v1"/><rect width="18" height="13" x="3" y="7" rx="2"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal; 