//DisplayProduct.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/DisplayProduct.css'



const DisplayProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3002/display')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleUpdate =(product)=>{
    console.log(product._id);
    console.log(product.brandname);
    console.log(product.category);
    console.log(product.subsubcategory);
    navigate('/update', { state: { product } });
  }
  const handleDelete =(_id)=>{
    console.log(_id);
    axios.delete(`http://localhost:3002/delete_product/${_id}`);
    window.location.reload();
  }

const fashionProducts = products.filter(product => product.category === 'Fashion');
const mobileProducts = products.filter(product => product.category === 'Mobiles');
const accessoriesProducts = products.filter(product => product.category === 'Accessories');
const appliancesProducts = products.filter(product => product.category === 'Appliances');
const electronicsProducts = products.filter(product => product.category === 'Electronics');
const smartGadgetsProducts = products.filter(product => product.category === 'Smart gadgets');
const homeEssentialsProducts = products.filter(product => product.category === 'Home essentials');
const beautyProducts = products.filter(product => product.category === 'Beauty and Personal Care');
const toysProducts = products.filter(product => product.category === 'Toys');
const stationaryProducts = products.filter(product => product.category === 'Stationary');
const foodHealthProducts = products.filter(product => product.category === 'Food and Health');
const sportsHubProducts = products.filter(product => product.category === 'Sports Hub');
const autoAccessoriesProducts = products.filter(product => product.category === 'Auto Accessories');
const furnitureProducts = products.filter(product => product.category === 'Furniture');
const medicinesProducts = products.filter(product => product.category === 'Medicines');

  // const renderProducts = (productList) => (
  //   productList.map((product) => (
  //     <div key={product._id}>
  //       <h5>{product.title}</h5>
  //       <p>Category: {product.category}</p>
  //       <p>Brand: {product.brandname}</p>
  //       <p>Price: {product.finalprice}</p>
  //       {product.sizes ? <h3>{product.sizes}</h3> : ""}
  //       <p>Description: {product.description}</p>
  //       {product.images.length > 0 && (
  //         <img src={product.images[0]} alt={product.title} width="200" />
  //       )}
  //       <button onClick={()=> handleUpdate(product)}>UPDATE</button>
  //       <button onClick={()=> handleDelete(product._id)}>DELETE</button>
  //     </div>
  //   ))
  // );











  const renderProducts = (productList) => (
    productList.map((product) => (
        <div key={product._id} className="product-card">
            <h5 className="product-title">{product.title}</h5>
            <p className="product-category">Category: {product.category}</p>
            <p className="product-brand">Brand: {product.brandname}</p>
            <p className="product-price">Price: {product.finalprice}</p>
            {product.sizes && <h3 className="product-sizes">{product.sizes}</h3>}
            <p className="product-description">Description: {product.description}</p>
            {product.images.length > 0 && (
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="product-image"
                />
            )}
            <div className="product-actions">
                <button className="update-button" onClick={() => handleUpdate(product)}>UPDATE</button>
                <button className="delete-button" onClick={() => handleDelete(product._id)}>DELETE</button>
            </div>
        </div>
    ))
);




















  return (
    <div className="product-list-container">
        <h1 className="product-list-title">Product List</h1>

        {/* Fashion Section */}
        {fashionProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Fashion</h2>
                <div className="subcategory-section">
                    <h3 className="subcategory-title">Men</h3>
                    <h4 className="subsubcategory-title">Men Top</h4>
                    {renderProducts(fashionProducts.filter(product => product.subcategory === 'Men' && product.subsubcategory === "mTop"))}
                    <h4 className="subsubcategory-title">Men Bottom</h4>
                    {renderProducts(fashionProducts.filter(product => product.subcategory === "Men" && product.subsubcategory === "mBottom"))}
                    <h4 className="subsubcategory-title">Men Footwear</h4>
                    {renderProducts(fashionProducts.filter(product => product.subcategory === "Men" && product.subsubcategory === "mFootwear"))}
                </div>
                <div className="subcategory-section">
                    <h3 className="subcategory-title">Women</h3>
                    <h4 className="subsubcategory-title">Women Top</h4>
                    {renderProducts(fashionProducts.filter(product => product.subcategory === 'Women' && product.subsubcategory === "wTop"))}
                    <h4 className="subsubcategory-title">Women Bottom</h4>
                    {renderProducts(fashionProducts.filter(product => product.subcategory === "Women" && product.subsubcategory === "wBottom"))}
                    <h4 className="subsubcategory-title">Women Footwear</h4>
                    {renderProducts(fashionProducts.filter(product => product.subcategory === "Women" && product.subsubcategory === "wFootwear"))}
                </div>
                <div className="subcategory-section">
                    <h3 className="subcategory-title">Kids</h3>
                    <h4 className="subsubcategory-title">Kids Top</h4>
                    {renderProducts(fashionProducts.filter(product => product.subcategory === 'Kids' && product.subsubcategory === "kTop"))}
                    <h4 className="subsubcategory-title">Kids Bottom</h4>
                    {renderProducts(fashionProducts.filter(product => product.subcategory === "Kids" && product.subsubcategory === "kBottom"))}
                    <h4 className="subsubcategory-title">Kids Footwear</h4>
                    {renderProducts(fashionProducts.filter(product => product.subcategory === "Kids" && product.subsubcategory === "kFootwear"))}
                </div>
            </div>
        )}

        {/* Mobiles Section */}
        {mobileProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Mobiles</h2>
                {renderProducts(mobileProducts)}
            </div>
        )}

        {/* Accessories Section */}
        {accessoriesProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Accessories</h2>
                {renderProducts(accessoriesProducts)}
            </div>
        )}

        {/* Appliances Section */}
        {appliancesProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Appliances</h2>
                {renderProducts(appliancesProducts)}
            </div>
        )}

        {/* Electronics Section */}
        {electronicsProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Electronics</h2>
                {renderProducts(electronicsProducts)}
            </div>
        )}

        {/* Smart Gadgets Section */}
        {smartGadgetsProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Smart Gadgets</h2>
                {renderProducts(smartGadgetsProducts)}
            </div>
        )}

        {/* Home Essentials Section */}
        {homeEssentialsProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Home Essentials</h2>
                {renderProducts(homeEssentialsProducts)}
            </div>
        )}

        {/* Beauty and Personal Care Section */}
        {beautyProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Beauty and Personal Care</h2>
                {renderProducts(beautyProducts)}
            </div>
        )}

        {/* Toys Section */}
        {toysProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Toys</h2>
                {renderProducts(toysProducts)}
            </div>
        )}

        {/* Stationary Section */}
        {stationaryProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Stationary</h2>
                {renderProducts(stationaryProducts)}
            </div>
        )}

        {/* Food and Health Section */}
        {foodHealthProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Food and Health</h2>
                {renderProducts(foodHealthProducts)}
            </div>
        )}

        {/* Sports Hub Section */}
        {sportsHubProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Sports Hub</h2>
                {renderProducts(sportsHubProducts)}
            </div>
        )}

        {/* Auto Accessories Section */}
        {autoAccessoriesProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Auto Accessories</h2>
                {renderProducts(autoAccessoriesProducts)}
            </div>
        )}

        {/* Furniture Section */}
        {furnitureProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Furniture</h2>
                {renderProducts(furnitureProducts)}
            </div>
        )}

        {/* Medicines Section */}
        {medicinesProducts.length > 0 && (
            <div className="category-section">
                <h2 className="category-title">Medicines</h2>
                {renderProducts(medicinesProducts)}
            </div>
        )}

        {/* Fallback if no products available */}
        {products.length === 0 && <p className="no-products-message">No products available</p>}
    </div>
);
};

export default DisplayProduct;
