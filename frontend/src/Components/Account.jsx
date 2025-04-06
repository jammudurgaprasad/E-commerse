import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Account.css";
import Navigation from "./Navigation";

const Account = () => {
  const [activeTab, setActiveTab] = useState("orders"); // Default tab
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchOrders();
      fetchAddresses();
    }
  }, [userId]);

// const abcd = 'http://localhost:3002';

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`https://e-commerse-vert-seven.vercel.app/orders/${userId}`);
      setOrders(response.data.slice().reverse()); // Ensure a new array is created before reversing
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/get_address/${userId}`);
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:3002/cancel_order/${orderId}`);
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Cancelled" } : order
          )
        );
        alert("Order cancelled successfully");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please try again.");
    }
  };

  const handleDelete = async (addressId) => {
    try {
      await axios.delete(`http://localhost:3002/delete_address/${addressId}`);
      fetchAddresses(); // Refresh address list
    } catch (error) {
      console.error("Error deleting address", error);
    }
  };

  return (
    <div className="account-container">
      <Navigation />
      <div className="tab-buttons">
        <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
          Orders
        </button>
        <button className={activeTab === "addresses" ? "active" : ""} onClick={() => setActiveTab("addresses")}>
          Addresses
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "orders" && (
          <div className="orders">
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <ul className="orders-list">
                {orders.map((order) => (
                  <li key={order._id} className="order-card">
                    <img src={order.productId?.images[0]} alt="Product" className="order-image" />
                    <div className="order-details">
                      <h3>Order ID: {order._id}</h3>
                      <p><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p><strong>Status:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
                      <h4>Item:</h4>
                      <p><strong>{order.productId?.title}</strong></p>
                      <p><strong>Size:</strong> {order.size}</p>
                      <p><strong>Quantity:</strong> {order.quantity}</p>
                      <p><strong>Rs. {order.productId?.finalprice} </strong><s>Rs. {order.productId?.actualprice}</s> (-{order.productId?.discount}%)</p>
                      <h4>Delivery Address:</h4>
                      <p>{order.addressId?.fullname}, {order.addressId?.houseno}, {order.addressId?.area}, {order.addressId?.city}, {order.addressId?.state}, {order.addressId?.pincode}</p>
                      {order.status === "Processing" && (
                        <button className="cancel-btn" onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "addresses" && (
  <div className="addresses">
    <h2>Your Addresses</h2>
    <button className="add-address-btn" onClick={() => alert("Add Address Clicked")}>
      Add Address
    </button>
    {addresses.length === 0 ? (
      <p>No addresses found.</p>
    ) : (
      <ul>
        {addresses.map((address) => (
          <li key={address._id} className="address-item">
            <div>
              <p><strong>{address.fullname}</strong></p>
              <p>{address.houseno}, {address.area}, {address.city}, {address.state}, {address.pincode}</p>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(address._id)}>Delete</button>
          </li>
        ))}
      </ul>
    )}
  </div>
)}

      </div>
    </div>
  );
};

export default Account;
