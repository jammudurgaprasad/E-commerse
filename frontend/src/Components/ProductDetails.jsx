import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/ProductDetails.css"; // Import CSS file
import Navigation from "./Navigation";

const ProductDetails = () => {
  const { _id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(""); // Track selected image
  const [selectedSize, setSelectedSize] = useState(""); // Track selected size
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // Get user ID from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/productdetails/${_id}`);
        setProduct(response.data);
        setSelectedImage(response.data.images[0]); // Set default image
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (_id) {
      fetchProductDetails();
    }
  }, [_id]);

  // Function to add product to cart
  const handleAddToCart = async () => {
    if (!userId) {
      alert("Please login first!");
      return;
    }

    try {
      if(product.sizes.length > 0 && !selectedSize){
        alert("Please select the size!");
        return;
      }
      else{
        const response = await axios.post("http://localhost:3002/add_to_cart", {
          userId,
          productId: _id,
          selectedSize,
        });
        alert(response.data.message);
      }
      
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!product) {
    return <p className="loading-text">Loading product details...</p>;
  }

  return (
    <div className="product-details-container">
    <Navigation/>
      {/* Left Side - Images */}
      <div className="image-section">
        <img src={selectedImage} alt={product.title} className="main-image" />
        <div className="thumbnail-container">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product ${index + 1}`}
              className={`thumbnail ${selectedImage === img ? "selected" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div className="details-section">
        <h2 className="product-title">{product.title}</h2>
        <p className="brand-name"><strong>Brand:</strong> {product.brandname}</p>
        <p className="category"><strong>Category:</strong> {product.category}  {product.subcategory}</p>

        {/* Price and Discount */}
        <p className="price">
          Rs. {product.finalprice} <s className="original-price">Rs. {product.actualprice}</s> 
          <span className="discount"> (-{product.discount}%)</span>
        </p>

        {/* Size Selection */}

        {product.sizes && 
          Array.isArray(product.sizes) && 
          product.sizes.length > 0 ? (
          <div className="size-selection">
            <h4>Select Size:</h4>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`size-btn ${selectedSize === size ? "selected-size" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ) : product.sizes && typeof product.sizes === "string" && product.sizes.trim() !== "" ? (
          <div className="size-selection">
            <h4>Select Size:</h4>
            <div className="size-options">
              {product.sizes.split(",").map((size, index) => (
                <button
                  key={index}
                  className={`size-btn ${selectedSize === size ? "selected-size" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.trim()}
                </button>
              ))}
            </div>
          </div>
        ) : null}



        {/* Buttons */}
        <div className="button-container">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
          <button className="go-to-cart-btn" onClick={() => navigate("/cart")}>Go to Cart</button>
        </div>

        {/* Description */}
        <p className="description"><strong>Description:</strong> {product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
