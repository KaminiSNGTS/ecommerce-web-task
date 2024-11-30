import React, { useContext } from 'react';
import { List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';
import { CartContext } from '../../context/cartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, total } = useContext(CartContext);

  return (
    <>
    {cartItems.length === 0 ?
      <Box display={'flex'} justifyContent={'center'}
      height={'100%'}
      width={'100%'}
      mt={'10rem'}
      alignItems={'center'}>
        <Typography textAlign={'center'} fontSize={'20px'} fontWeight={600}>No cart found</Typography>
      </Box>
  :
    <div>
     
      <Typography variant="h4" fontWeight={600}>Cart</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id} divider

          >
            <ListItemText

              primary={`${item.name} - $${item.price}`} secondary={`Quantity: ${item.quantity}`} />
            <Button
              sx={{
                bgcolor: 'white',
                color: 'red',
                borderRadius: '8px',
                border: '1px solid red',
                width: 'fit-content',
                px: '20px',
                ml: '15px',
                height: '40px',
                fontWeight: '600',
              }}
              onClick={() => removeFromCart(item.id)}>Remove</Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" mt={2}
        fontWeight={600}
      >Total: <span style={{ color: 'blue' }}>${total}</span></Typography>
    </div>
}
    </>
  );
};

export default CartPage;
