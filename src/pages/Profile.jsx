import React from "react";

const mockUser = {
  name: "Jane Doe",
  email: "jane@example.com",
  address: "123 Main St, City, Country",
};
const mockOrders = [
  { id: 1, date: "2024-05-01", total: 120.5, status: "Delivered" },
  { id: 2, date: "2024-04-15", total: 89.99, status: "Shipped" },
];

const Profile = ({ onLogout }) => (
  <div className="profile-page">
    <h2>My Profile</h2>
    <div className="profile-info">
      <p><strong>Name:</strong> {mockUser.name}</p>
      <p><strong>Email:</strong> {mockUser.email}</p>
      <p><strong>Address:</strong> {mockUser.address}</p>
    </div>
    <h3>Order History</h3>
    <table className="profile-orders">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {mockOrders.map(order => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.date}</td>
            <td>${order.total.toFixed(2)}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button className="logout-btn" onClick={onLogout}>Logout</button>
  </div>
);

export default Profile; 