import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login';
import Home from './home';
import UserHome from './userhome';
import ProductDetails from './addproducts';
// import BookAppointment from './bookappointment';
// import MyProfile from './myprofile';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function Website() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='/home' element={<Home/>} />
        <Route path='/addproducts' element={<ProductDetails/>} />
        <Route path='/userhome' element={<UserHome/>} />
      </Routes>
    </BrowserRouter>
  );
}


ReactDOM.render(<Website/>, document.getElementById('root'));