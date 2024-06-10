import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import SignUp from './components/user/SignUp.jsx';
import SignIn from './components/user/SignIn.jsx';
import AppBar from './components/static/NavBar.jsx';
import ForgetPassword from './components/user/ForgetPassword.jsx';
import ResetPassword from './components/user/ResetPassword.jsx';
import Card from './components/Card.jsx';
import Footer from './components/static/Footer.jsx';
import Hero from './components/home/Hero.jsx';
import MultiCard from './components/home/MultiCard.jsx';
import ProductNew from './components/product/ProductNew.jsx';
import ProductEdit from './components/product/ProductEdit.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/user/Profile.jsx';
import EditProfile from './components/user/EditProfile.jsx';

import ShowProduct from './components/product/ShowProduct.jsx';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <MultiCard />
          </>
        } />
        <Route path="/profile/:urlprofile" element={<Profile/>}/>
        <Route path="/profile/edit" element={<EditProfile/>}/>
        <Route path="/productnew" element={<ProductNew />} />
        <Route path="/productedit" element={<ProductEdit />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/card" element={<Card />} />
        <Route path="/product/:productId" element={<ShowProduct />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
