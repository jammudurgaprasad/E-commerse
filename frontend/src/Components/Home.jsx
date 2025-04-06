//Home.jsx
import React from 'react';
import Navigation from './Navigation';
import Categories from './Categories';
import ProductsSection from './ProductsSection';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <Navigation/>
      <Categories/>
      <ProductsSection/>
      <Footer/>
    </div>
    
  )
}

export default Home