import React from "react";
import "../CSS/Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>DP Mart</h2>
          <p>Your one-stop shop for all your needs. Quality products at the best prices.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" className="icon">📘</a>
            <a href="#" className="icon">🐦</a>
            <a href="#" className="icon">📸</a>
            <a href="#" className="icon">▶</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@dpmart.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123, DP Street, Mumbai, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 DP Mart. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
