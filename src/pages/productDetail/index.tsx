import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { fetchProductById } from '../../services/api';
import { CartContext } from '../../context/cartContext/index';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id!);
      setProduct(data);
    };
    loadProduct();
  }, [id]);


  return (
    <>
      <Box width={'100%'} height={{ xs: '100%', md: '80vh' }} display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {product ?
          <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap:{xs:4, md:6}, padding: 2 }}>
            <Box width={'100%'}>
              <CardMedia component="img"
                sx={{
                  height: { xs: '250px', md: '400px' },
                  objectFit: 'contain',
                  p: '10px',
                }}
                image={product.image} alt={product.title} />
            </Box>
            <CardContent sx={{ width: '100%' }}>
              <Typography variant="h2" fontSize={{ xs: '20px', md: '28px' }} fontWeight={600}>{product.title}</Typography>
              <Typography variant="h1" fontSize={{ xs: '28px', md: '40px' }}
                fontWeight={600} color='blue'
                mt={2}
              >${product.price}</Typography>
              <Typography variant="body2" color='grey'
                mt={2}
              >{product.description}</Typography>
              <Button
                sx={{
                  bgcolor: 'blue',
                  boxShadow: '0px 0px 6px 1px lightgrey',
                  borderRadius: '8px',
                  width: 'fit-content',
                  mt: '25px',
                  px: '30px',
                  height: '45px',
                  color: 'white',
                  fontWeight: '600',
                }}
                onClick={() => addToCart({ id: product.id, name: product.title, price: product.price, quantity: 1 })}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>

          :
          <Typography>Loading...</Typography>
        }
      </Box>

    </>
  );
};

export default ProductDetail;
