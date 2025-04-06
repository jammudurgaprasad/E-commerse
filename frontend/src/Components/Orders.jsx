import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Orders.css"; // Import the CSS file
import Navigation from "./Navigation";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // const fetchOrders = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:3002/orders/${userId}`);
    //     setOrders(response.data);
    //   } catch (error) {
    //     console.error("Error fetching orders:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/orders/${userId}`);
        setOrders(response.data.slice().reverse()); // Reverse without mutating the original data
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

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

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="orders-container">
      <Navigation />
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
                <p><strong>Size : </strong>{order.size}</p>
                <p><strong>Quantity: </strong>{order.quantity}</p>
                <p><strong>Rs. {order.productId?.finalprice} </strong><s>Rs. {order.productId?.actualprice}</s> (-{order.productId?.discount}%)</p>

                <h4>Delivery Address:</h4>
                <p>
                  {order.addressId?.fullname}, {order.addressId?.houseno}, {order.addressId?.area}, 
                  {order.addressId?.city}, {order.addressId?.state}, {order.addressId?.pincode}
                </p>

                {order.status === "Processing" && (
                  <button className="cancel-btn" onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
