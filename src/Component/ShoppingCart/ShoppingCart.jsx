import React from 'react';
import { Container, Grid, Paper, Typography, Button, Box, Divider, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, DecreaseCart, ClearCart, RemoveItem } from '../../Store/Slices/CartSlice';
import { Add, Remove } from '@mui/icons-material';
import { Link } from 'react-router-dom';
// import { removeFromCart } from '../redux/actions/cartActions';

export default function ShoppingCart() {
  const cartItems = useSelector(state => state.cart.cartItem);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(RemoveItem(id));
  };

  const handleClearCart = () => {
    dispatch(ClearCart());
  };

  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrease = (item) => {
    dispatch(DecreaseCart(item))
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.cartQty, 0).toFixed(2);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <Paper key={item.id} sx={{ mb: 2, p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <img src={item.image} alt={item.title} style={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Box display="flex" alignItems="center">
                      <IconButton onClick={() => handleDecrease(item)}>
                        <Remove />
                      </IconButton>
                      <Typography variant="body2" color="text.secondary">
                        {item.cartQty}
                      </Typography>
                      <IconButton onClick={() => handleIncrease(item)}>
                        <Add />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${item.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="outlined" color="error" onClick={() => handleRemove(item.id)}>
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary">
              Your cart is empty.
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Order Summary</Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1">Total:</Typography>
              <Typography variant="body1">${calculateTotal()}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleClearCart}
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </Button>
            <Link to="/" >
              Continue Shopping
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
