//ProductSection.jsx
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../CSS/ProductsSection.css';

const ProductsSection = () => {
    const[products,setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:3002/display')
        .then((response)=>{
            setProducts(response.data)
        })
        .catch((err)=> console.log(err))
    },[])

    const fashionProducts = products.filter(product => product.category === "Fashion");
    const mobileProducts = products.filter(product => product.category === "Mobiles");
    const accessoriesProducts = products.filter(product => product.category === "Accessories");
    const appliancesProducts = products.filter(product => product.category === "Appliances");
    const electronicsProducts = products.filter(product => product.category === "Electronics");
    const smartGadgetsProducts = products.filter(product => product.category === "Smart gadgets");
    const homeEssentialsProducts = products.filter(product => product.category === "Home essentials");
    const beautyProducts = products.filter(product => product.category === "Beauty and Personal Care");
    const toysProducts = products.filter(product => product.category === 'Toys');
    const stationaryProducts = products.filter(product => product.category === 'Stationary');
    const foodHealthProducts = products.filter(product => product.category === 'Food and Health');
    const sportsHubProducts = products.filter(product => product.category === 'Sports Hub');
    const autoAccessoriesProducts = products.filter(product => product.category === 'Auto Accessories');
    const furnitureProducts = products.filter(product => product.category === 'Furniture');
    const medicinesProducts = products.filter(product => product.category === 'Medicines');

    const renderProducts =(productsList)=>(
        productsList.map((product)=>(
            <div className="product-card" key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
                {product.images.length > 0 && (
                <img src={product.images[0]} alt={product.title} width="100" height="100" />
                )}
                <p style={{color:"gray;"}}><strong>{product.brandname}</strong></p>
                <h5>{product.title}</h5>
                <p>Rs. {product.finalprice} <s>Rs.{product.actualprice}</s>(-{product.discount}%)</p>
            </div>
        ))
    )

  return (
    <div>
    {/* Fashion Section */}
      {fashionProducts.length > 0 && (
        <div>
          <h1 className='head-padding'>Fashion</h1>

          <h2 className='head-padding'>Men Top</h2>
          <div className='products-container'>
          {renderProducts(fashionProducts.filter(product => product.subcategory === 'Men' && product.subsubcategory === "mTop"))}
          </div>

          <h2 className='head-padding'>Men Bottom</h2>
          <div className='products-container'>
          {renderProducts(fashionProducts.filter(product => product.subcategory === "Men" && product.subsubcategory === "mBottom"))}
          </div>

          <h2 className='head-padding'>Men Footwear</h2>
          <div className='products-container'>
          {renderProducts(fashionProducts.filter(product => product.subcategory === "Men" && product.subsubcategory === "mFootwear"))}
          </div>

          <h2 className='head-padding'>Women Top</h2>
          <div className='products-container'>
          {renderProducts(fashionProducts.filter(product => product.subcategory === 'Women' && product.subsubcategory === "wTop"))}
          </div>

          <h2 className='head-padding'>Women Bottom</h2>
          <div className='products-container'>
          {renderProducts(fashionProducts.filter(product => product.subcategory === "Women" && product.subsubcategory === "wBottom"))}
          </div>

          <h2 className='head-padding'>Women Footwear</h2>
          <div className='products-container'>
          {renderProducts(fashionProducts.filter(product => product.subcategory === "Women" && product.subsubcategory === "wFootwear"))}
          </div>

          <h2 className='head-padding'>Kids Top</h2>
          <div className='products-container'>
          {renderProducts(fashionProducts.filter(product => product.subcategory === 'Kids' && product.subsubcategory === "kTop"))}
          </div>

          <h2 className='head-padding'>Kids Bottom</h2>
          <div className='products-container'>
          {renderProducts(fashionProducts.filter(product => product.subcategory === "Kids" && product.subsubcategory === "kBottom"))}
          </div>

          <h2 className='head-padding'>Kids Footwear</h2>
          <div className='products-container'>
          {renderProducts(fashionProducts.filter(product => product.subcategory === "Kids" && product.subsubcategory === "kFootwear"))}
          </div>

        </div>
      )}

      {/* Mobiles Section */}
      {mobileProducts.length > 0 && (
        <div>
          <h2 className='head-padding'>Mobiles</h2>
          <div className='products-container'>
          {renderProducts(mobileProducts)}
          </div>
        </div>
      )}


      {/* Accessories Section */}
    {accessoriesProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Accessories</h2>
        <div className='products-container'>
        {renderProducts(accessoriesProducts)}
        </div>
    </div>
    )}

    {/* Appliances Section */}
    {appliancesProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Appliances</h2>
        <div className='products-container'>
        {renderProducts(appliancesProducts)}
        </div>
    </div>
    )}

    {/* Electronics Section */}
    {electronicsProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Electronics</h2>
        <div className='products-container'>
        {renderProducts(electronicsProducts)}
        </div>
    </div>
    )}

    {/* Smart Gadgets Section */}
    {smartGadgetsProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Smart Gadgets</h2>
        <div className='products-container'>
        {renderProducts(smartGadgetsProducts)}
        </div>
    </div>
    )}

    {/* Home Essentials Section */}
    {homeEssentialsProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Home Essentials</h2>
        <div className='products-container'>
        {renderProducts(homeEssentialsProducts)}
        </div>
    </div>
    )}

    {/* Beauty and Personal Care Section */}
    {beautyProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Beauty and Personal Care</h2>
        <div className='products-container'>
        {renderProducts(beautyProducts)}
        </div>
    </div>
    )}

    {/* Toys Section */}
    {toysProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Toys</h2>
        <div className='products-container'>
        {renderProducts(toysProducts)}
        </div>
    </div>
    )}

    {/* Stationary Section */}
    {stationaryProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Stationary</h2>
        <div className='products-container'>
        {renderProducts(stationaryProducts)}
        </div>
    </div>
    )}

    {/* Food and Health Section */}
    {foodHealthProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Food and Health</h2>
        <div className='products-container'>
        {renderProducts(foodHealthProducts)}
        </div>
    </div>
    )}

    {/* Sports Hub Section */}
    {sportsHubProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Sports Hub</h2>
        <div className='products-container'>
        {renderProducts(sportsHubProducts)}
        </div>
    </div>
    )}

    {/* Auto Accessories Section */}
    {autoAccessoriesProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Auto Accessories</h2>
        <div className='products-container'>
        {renderProducts(autoAccessoriesProducts)}
        </div>
    </div>
    )}

    {/* Furniture Section */}
    {furnitureProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Furniture</h2>
        <div className='products-container'>
        {renderProducts(furnitureProducts)}
        </div>
    </div>
    )}

    {/* Medicines Section */}
    {medicinesProducts.length > 0 && (
    <div>
        <h2 className='head-padding'>Medicines</h2>
        <div className='products-container'>
        {renderProducts(medicinesProducts)}
        </div>
    </div>
    )}

      {/* Fallback if no products available */}
      {products.length === 0 && <p>No products available</p>}
    </div>
  )
}

export default ProductsSection