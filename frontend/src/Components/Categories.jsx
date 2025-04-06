// //Categories.jsx
// import React from 'react'

// const Categories = () => {
//     const categories = [
//         "Fashion",
//         "Appliances",
//         "Mobiles",
//         "Electronics",
//         "Smart Gadgets",
//         "Home essentials",
//         "Beautiful and personal care",
//         "Toys, baby, books",
//         "Food and health",
//         "Sports hub",
//         "Auto accessories",
//         "Furniture",
//         "Gift cards",
//         "Bikes and scooters",
//         "Medicines",
//       ];
      
//   return (
//     <div style={{display:'flex'}}>
//         {
//             categories.map((category,index)=>(
//             <p key={index}>{category}</p>
//         ))
//         }
//     </div>
//   )
// }

// export default Categories



import React from 'react';
import '../CSS/Categories.css'; // Ensure you have this CSS for styling
import fashion from '../Category_Images/fashion.jpg'
import mobiles from '../Category_Images/mobiles.jpeg';
import appliances from '../Category_Images/appliances.jpg';
import electronics from '../Category_Images/electronics.jpg';
import smartGadgets from '../Category_Images/smart gadjets.jpg';
import homeEssentials from '../Category_Images/home essentials.jpg';
import beauty from '../Category_Images/beauty.jpg';
import toysbooks from '../Category_Images/toys and books.jpg';
import food from '../Category_Images/food and health.jpg';
import sports from '../Category_Images/sports hub.jpg';
import auto from '../Category_Images/auto.jpg';
import furniture from '../Category_Images/Furniture.jpg';
import gift from '../Category_Images/Gift Cards.jpg';
import bikes from '../Category_Images/bikes.jpg';
import medicines from '../Category_Images/Medicines.jpg';
 
const Categories = () => {
  const categories = [
    { name: "Fashion", imgSrc: fashion },
    { name: "Appliances", imgSrc: appliances },
    { name: "Mobiles", imgSrc: mobiles },
    { name: "Electronics", imgSrc: electronics },
    { name: "Smart Gadgets", imgSrc: smartGadgets },
    { name: "Home Essentials", imgSrc: homeEssentials },
    { name: "Beauty & Personal Care", imgSrc: beauty },
    { name: "Toys, Baby & Books", imgSrc: toysbooks },
    { name: "Food & Health", imgSrc: food },
    { name: "Sports Hub", imgSrc: sports },
    { name: "Auto Accessories", imgSrc: auto },
    { name: "Furniture", imgSrc: furniture },
    { name: "Gift Cards", imgSrc: gift },
    { name: "Bikes & Scooters", imgSrc: bikes },
    { name: "Medicines", imgSrc: medicines },
  ];

  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <div key={index} className="category-item">
          <img src={category.imgSrc} alt={category.name} className="category-img" />
          <p className="category-name">{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
