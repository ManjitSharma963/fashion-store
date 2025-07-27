import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/orders.css";

const mockOrders = [
  {
    id: "OP16003",
    date: "Saturday, 20 February, 2016",
    items: [
      {
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=facearea&w=200&h=200&q=80",
        name: "ASOS",
        price: 82.0,
        desc: "WHITE Stripe Bomber Jacket",
        size: "L",
        duration: "3 DAYS",
        delivery: "DEC 2. 2015",
      },
      {
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=200&h=200&q=80",
        name: "ASOS WHITE",
        price: 82.0,
        desc: "Tunic Top With Square V-Neck",
        size: "L",
        duration: "3 DAYS",
        delivery: "DEC 2. 2015",
      },
    ],
    total: 150.0,
    itemCount: 2,
    status: "ongoing",
  },
];

const Orders = () => {
  const [tab, setTab] = useState("ongoing");
  const orders = mockOrders.filter(o => o.status === tab);
  const navigate = useNavigate();

  return (
    <div className="orders-page">
      <div className="orders-header">
        <button className="orders-close" onClick={() => navigate("/")}>×</button>
        <h2>MY ORDERS</h2>
      </div>
      <div className="orders-tabs">
        <button className={tab === "ongoing" ? "active" : ""} onClick={() => setTab("ongoing")}>ONGOING</button>
        <button className={tab === "past" ? "active" : ""} onClick={() => setTab("past")}>PAST ORDERS</button>
      </div>
      <div className="orders-list">
        {orders.map(order => (
          <div className="order-card" key={order.id}>
            <div className="order-summary">
              <div className="order-summary-row">
                <span className="order-summary-label">ORDER NO</span>
                <span className="order-summary-value">{order.id}</span>
              </div>
              <div className="order-summary-date">Placed on {order.date}</div>
              <div className="order-summary-meta">
                <span className="order-summary-meta-label">ITEM</span>
                <span className="order-summary-meta-value">{order.itemCount}</span>
                <span className="order-summary-meta-label">TOTAL</span>
                <span className="order-summary-meta-value">${order.total.toFixed(2)}</span>
              </div>
              {order.status === "ongoing" && (
                <span className="order-status-chip">ONGOING</span>
              )}
            </div>
            {order.items.map((item, idx) => (
              <div className="order-item" key={idx}>
                <img src={item.image} alt={item.name} className="order-item-img" />
                <div className="order-item-info">
                  <div className="order-item-row">
                    <span className="order-item-title">{item.name}</span>
                    <span className="order-item-price">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="order-item-desc">{item.desc}</div>
                  <div className="order-item-details">
                    <div className="order-detail-row">
                      <span className="order-detail-label">Size</span>
                      <span className="order-detail-value">{item.size}</span>
                    </div>
                    <div className="order-detail-row">
                      <span className="order-detail-label">Duration</span>
                      <span className="order-detail-value">{item.duration}</span>
                    </div>
                    <div className="order-detail-row">
                      <span className="order-detail-label">Delivery By</span>
                      <span className="order-detail-value">{item.delivery}</span>
                    </div>
                  </div>
                  <div className="order-item-actions">
                    <button className="order-cancel">CANCEL</button>
                    <button className="order-track">TRACK</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        {orders.length === 0 && (
          <div className="orders-empty">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default Orders; 