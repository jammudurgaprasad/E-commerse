//Cart.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Cart.css";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/cart/${userId}`);
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };

    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/get_address/${userId}`);
        setAddress(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    if (userId) {
      fetchCartItems();
      fetchAddresses();
    }
  }, [userId]);

  const handleDelete = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:3002/cart/${cartItemId}`);
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item._id !== cartItemId));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };


const paymentHandler = async (totalAmount, currency, userId, e) => {
  if (e) e.preventDefault(); // Prevent default form submission if called from a button

  console.log("Initializing Payment...");
  console.log("Total Amount:", totalAmount);
  console.log("Currency:", currency);
  console.log("User ID:", userId);

  try {
      // Step 1: Create an order on the backend
      const response = await fetch("http://localhost:3002/order", {
          method: "POST",
          body: JSON.stringify({
              amount: totalAmount * 100, // Convert to paise
              currency,
              receipt: userId,
          }),
          headers: { "Content-Type": "application/json" },
      });

      const order = await response.json();
      console.log("Order Created:", order);

      if (!order.id) {
          alert("Failed to create order. Please try again.");
          return;
      }

      // Step 2: Initialize Razorpay with order details
      const options = {
          key: "rzp_test_vxv4CM7EvhMf2a", // Razorpay Test Key
          amount: totalAmount * 100,
          currency,
          name: "Hanuman Footwear",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order.id, // Order ID from backend
          handler: async function (response) {
              console.log("Razorpay Payment Response:", response);

              // Step 3: Validate payment with the backend
              const validateRes = await fetch("http://localhost:3002/order/validate", {
                  method: "POST",
                  body: JSON.stringify(response),
                  headers: { "Content-Type": "application/json" },
              });

              const jsonRes = await validateRes.json();
              console.log("Validation Response:", jsonRes);

              if (jsonRes.status === "success") {
                  alert("Payment Successful!");
                  placeOrder(); // Call placeOrder only if payment is validated
              } else {
                  alert("Payment validation failed. Please try again.");
              }
          },
          prefill: {
              name: "Durga Prasad",
              email: "jammudurgaprasad04.com",
              contact: "6302437147",
          },
          notes: {
              address: "Razorpay Corporate Office",
          },
          theme: {
              color: "#3399cc",
          },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
          console.error("Payment Failed:", response);
          alert(`Payment Failed: ${response.error.description}`);
      });

      rzp1.open();
  } catch (error) {
      console.error("Error in paymentHandler:", error);
      alert("Error processing payment. Please try again.");
  }
};





  const placeOrder = async () => {

    if (!selectedAddress) {
      alert("Please select an address before placing the order.");
      return;
    }

    try {
      let allOrdersPlaced = true;
      for (const item of cartItems) {
        const response = await axios.post("http://localhost:3002/place_order", {
          userId,
          productId: item.productId,
          quantity: item.quantity,
          size: item.size || "N/A",
          addressId: selectedAddress,
        });

        if (response.status !== 201) {
          allOrdersPlaced = false;
        }
      }

      if (allOrdersPlaced) {
        alert("Order placed successfully!");
        navigate("/orders");
      } else {
        alert("Some orders failed. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.productId.finalprice * item.quantity, 0);
  const discountPrice = cartItems.reduce((acc, item) => acc + (item.productId.actualprice - item.productId.finalprice) * item.quantity, 0);
  const platformFee = cartItems.length > 0 ? 3.0 : 0;
  const deliveryCharges = totalPrice > 499 ? 0 : cartItems.length > 0 ? 49.0 : 0;
  const totalAmount = totalPrice + platformFee + deliveryCharges;
  const currency = "INR";

  return (
    <div>
      <Navigation />
      <div className="cart-container">
        <div className="cart-items">
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item._id} className="cart-item">
                  <img src={item.productId.images[0]} alt={item.productId.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.productId.title}</h3>

                    {item.size && item.size !== "N/A" && <p className="cart-item-size"><strong>Size:</strong> {item.size}</p>}

                    <p className="cart-item-quantity"><strong>Quantity:</strong> {item.quantity}</p>
                    <p>
                      <span className="final-price">Rs. {parseFloat(item.productId.finalprice * item.quantity).toFixed(2)}</span>
                      <span className="actual-price"> Rs. {parseFloat(item.productId.actualprice * item.quantity).toFixed(2)}</span>
                      <span className="discount"> (-{item.productId.discount}%)</span>
                    </p>
                    <button className="delete-btn" onClick={() => handleDelete(item._id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="price-details">
          <h3 className="price-title">PRICE DETAILS</h3>
          <div className="price-breakdown">
            <p>Price (1 item) <span>₹{parseFloat(totalPrice).toFixed(2)}</span></p>
            <p className="discount-text">Discount <span>- ₹{parseFloat(discountPrice).toFixed(2)}</span></p>
            <p>Platform Fee <span>₹{parseFloat(platformFee).toFixed(2)}</span></p>
            <p className="delivery-charge">
              Delivery Charges <span className={deliveryCharges === 0 ? "free-delivery" : ""}>
                {deliveryCharges === 0 ? <s>₹40</s> : `₹${parseFloat(deliveryCharges).toFixed(2)}`} Free
              </span>
            </p>
          </div>

          <hr />

          <h3 className="total-amount">Total Amount <span>₹{parseFloat(totalAmount).toFixed(2)}</span></h3>

          <p className="savings-text">You will save ₹{parseFloat(discountPrice).toFixed(2)} on this order</p>

          <div className="address-selection">
            <h3>Choose Address</h3>
            {address.length === 0 ? (
              <button onClick={() => navigate('/address')} className="add-address-btn">Add Address</button>
            ) : (
              <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                <option value="" disabled>Select an address</option>
                {address.map((add) => (
                  <option key={add._id} value={add._id}>
                    {add.fullname}, {add.houseno}, {add.area}, {add.city}, {add.state}, {add.pincode}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button onClick={(e)=>paymentHandler(totalAmount, currency, userId, e)} disabled={!selectedAddress} className="place-order-btn">Place Order</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;