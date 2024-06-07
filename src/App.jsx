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
import ProductNewEdit from './components/product/ProductNewEdit.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <Route path="/productnewedit" element={<ProductNewEdit />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/card" element={<Card />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;