// components/navbar/index.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useContext } from 'react';
import { CartContext } from '../../context/cartContext/index';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const { cartItems, wishlistItems } = useContext(CartContext);

    return (
        <AppBar position="fixed" sx={{ bgcolor: 'blue',
         top:0,
         width: '100%',
         }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        ECOMMERCE WEB
                    </Link>
                </Typography>
                <IconButton sx={{ color: 'white' }}>
                    <Badge badgeContent={wishlistItems.length} color="error">
                        <FaHeart />
                    </Badge>
                </IconButton>
                <IconButton sx={{ color: 'white' , ml:2}} >
                    <Link to="/cart" style={{ color: 'inherit', textDecoration: 'none' }}>

                        <Badge badgeContent={cartItems.length} color="error">
                            <FaShoppingCart />
                        </Badge>
                    </Link>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
