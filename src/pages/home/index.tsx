import React, { useEffect, useState, useContext } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../services/api';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { CartContext } from '../../context/cartContext/index';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

const HomePage: React.FC = () => {
  const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } = useContext(CartContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    loadProducts();
  }, []);

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
      });
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      <FormControl fullWidth sx={{ marginBottom: '20px', width: { xs: '100%', md: '50%', lg: '30%', pt: 4 } }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="men's clothing">men's clothing</MenuItem>
          <MenuItem value="jewelery">jewelery</MenuItem>
          <MenuItem value="electronics">electronics</MenuItem>
          <MenuItem value="women's clothing">women's clothing</MenuItem>
        </Select>
      </FormControl>

      {filteredProducts.length !== 0 ?
        <Grid container spacing={2} mt={1}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ position: 'relative', boxShadow: '0px 0px 6px 1px lightgrey' }}>
                <CardMedia
                  component="img"
                  height="300px"
                  width={'100%'}
                  sx={{
                    objectFit: 'contain',
                    p: '10px',
                  }}
                  image={product.image}
                  alt="image"
                />
                <CardContent>
                  <Typography
                    fontSize={'18px'}
                    fontWeight={500}
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="h2" fontSize={'28px'} fontWeight={'600'} color="blue">
                    ${product.price}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    sx={{
                      bgcolor: 'white',
                      boxShadow: '0px 0px 6px 1px lightgrey',
                      borderRadius: '8px',
                      width: '100%',
                      mt: '15px',
                      height: '45px',
                      color: 'black',
                      fontWeight: '600',
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>

                <Box
                  bgcolor={'lightgrey'}
                  width={'40px'}
                  position={'absolute'}
                  top={4}
                  right={4}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={'40px'}
                  borderRadius={'30px'}
                  onClick={() => toggleWishlist(product)}
                  sx={{ cursor: 'pointer' }}
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart color="red" fontSize={'20px'} />
                  ) : (
                    <FaRegHeart color="red" fontSize={'20px'} />
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        :
        <Typography textAlign={'center'} mt={'4rem'} fontSize={'20px'} >Loading...</Typography>
      }
    </div>
  );
};

export default HomePage;
