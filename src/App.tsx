import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './components/navbar/index';
import HomePage from './pages/home/index';
import ProductDetail from './pages/productDetail/index';
import CartPage from './pages/cart/index';
import { CartProvider } from './context/cartContext/index';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <CssBaseline />
        <Navbar />
        <Container sx={{ marginTop: '6rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Container>
      </Router>
    </CartProvider>
  );
};

export default App;
