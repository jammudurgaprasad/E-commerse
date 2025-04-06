import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Login from "./Components/Login";
import AddProduct from './Components/AddProduct';
import ProtectedRoute from "./Components/ProtectedRoute"; // Import this!
import DisplayProduct from './Components/DisplayProduct';
import UpdateProduct from './Components/UpdateProduct';
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
import Addresses from './Components/Addresses'
import Orders from './Components/Orders';
import Account from './Components/Account';




function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/upload' element={<AddProduct/>}/>
          <Route path='/display' element={<DisplayProduct/>}/>
          <Route path='/update' element={<UpdateProduct/>}/>
          <Route path="/product/:_id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Addresses/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/account" element={<Account/>}/>
          {/* <Route path='/productdetails' element={<ProductDetails/>}/> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
