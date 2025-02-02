import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, Box, Typography, TextField, Button, Link, Checkbox, FormControlLabel } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import RouterLink and useNavigate
import { GoogleLogin } from '@react-oauth/google'; // Import Google Login

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('Accepting terms is required'),
});

const SignUp = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleGoogleLogin = (response) => {
    console.log('Google login response:', response);
  };

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log('Form Submitted:', values);

    // After successful sign-up, redirect to the home page
    navigate('/'); // Redirect to home page
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            termsAccepted: false, // Track acceptance of terms
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={handleChange}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              
              {/* Terms and Conditions Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="termsAccepted"
                    value={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      setFieldValue('termsAccepted', e.target.checked);
                    }}
                  />
                }
                label={
                  <span>
                    I accept the{' '}
                    <RouterLink to="/terms">Terms and Conditions</RouterLink>
                  </span>
                }
              />
              {touched.termsAccepted && errors.termsAccepted && (
                <Typography color="error" variant="body2">
                  {errors.termsAccepted}
                </Typography>
              )}
              
              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!termsAccepted} // Disable if terms are not accepted
              >
                Sign Up
              </Button>

              {/* Social Login Buttons */}
              <Box sx={{ mt: 2 }}>
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={(error) => console.error('Google Login Failed:', error)}
                />
              </Box>

              <Box textAlign="center" sx={{ mt: 3 }}>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignUp;
