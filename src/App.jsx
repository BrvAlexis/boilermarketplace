import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/user/Profile.jsx';
import EditProfile from './components/user/EditProfile.jsx';

import ShowProduct from './components/product/ShowProduct.jsx';

import { useAtomValue } from 'jotai';
import { userAtom } from './components/atom/atom';
import Home from './components/home/Home.jsx';

import Cookie from './components/cookie/cookie.jsx'

const PrivateRoute = ({ children }) => {

  const currentUser = useAtomValue(userAtom);
  const location = useLocation();

  if (currentUser.id) {
    return children;
  } else {
    toast.error('You must be connected to see profile');
    return <Navigate to="/signin" state={{ from: location }} />;
  }
}

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile/:urlprofile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
        <Route path="/profile/edit" element={<PrivateRoute><EditProfile /></PrivateRoute>}/>
        <Route path="/productnew" element={<ProductNew />} />
        
        <Route path="/productedit/:productId" element={<ProductEdit />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/card" element={<Card />} />
        <Route path="/product/:productId" element={<ShowProduct />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/users/password/edit" element={<ResetPassword />} />

      </Routes>
      <Cookie/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
