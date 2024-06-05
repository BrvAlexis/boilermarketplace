import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import SignUp from './page/SignUp.jsx';
import SignIn from './page/SignIn.jsx';
import AppBar from './components/AppBar.jsx';

import Card from './components/Card.jsx';
import Footer from './components/Footer.jsx';
import Hero from './page/Hero.jsx';
import MultiCard from './page/MultiCard.jsx';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar />
      
      
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <MultiCard />
          </>
        } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/card" element={<Card />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;