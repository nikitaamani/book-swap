import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Container, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Book 1', price: 15.99, quantity: 2 },
    { id: 2, title: 'Book 2', price: 9.99, quantity: 1 },
  ]);
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'US',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const navigate = useNavigate();

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Simulate form submission
    console.log('Order submitted:', { cartItems, shippingInfo, paymentInfo });

    // SweetAlert2 confirmation
    Swal.fire({
      title: 'Order Placed Successfully!',
      text: 'Thank you for your purchase. You will receive an email confirmation shortly.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      // Redirect to home page after SweetAlert2 is closed
      navigate('/');
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Container component="main" maxWidth="sm" className="checkout-container">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom className="checkout-header">
          Checkout
        </Typography>

        {/* Cart Summary */}
        <Box className="cart-summary">
          <Typography variant="h6">Cart Summary</Typography>
          {cartItems.map((item) => (
            <Box key={item.id} className="cart-summary-item">
              <Typography>{item.title} x {item.quantity}</Typography>
              <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}
          <Typography className="cart-summary-total">Total: ${calculateTotal()}</Typography>
        </Box>

        {/* Shipping Information */}
        <Box className="shipping-info">
          <Typography variant="h6">Shipping Information</Typography>
          <TextField
            label="Address"
            name="address"
            fullWidth
            value={shippingInfo.address}
            onChange={handleShippingChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="City"
            name="city"
            fullWidth
            value={shippingInfo.city}
            onChange={handleShippingChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Postal Code"
            name="postalCode"
            fullWidth
            value={shippingInfo.postalCode}
            onChange={handleShippingChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Country</InputLabel>
            <Select
              name="country"
              value={shippingInfo.country}
              onChange={handleShippingChange}
              label="Country"
            >
              <MenuItem value="US">United States</MenuItem>
              <MenuItem value="CA">Canada</MenuItem>
              <MenuItem value="IN">India</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Payment Information */}
        <Box className="payment-info">
          <Typography variant="h6">Payment Information</Typography>
          <TextField
            label="Card Number"
            name="cardNumber"
            fullWidth
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Expiration Date (MM/YY)"
            name="expirationDate"
            fullWidth
            value={paymentInfo.expirationDate}
            onChange={handlePaymentChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="CVV"
            name="cvv"
            fullWidth
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          className="checkout-button"
        >
          Complete Purchase
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;
