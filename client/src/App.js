import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import Blog from './components/Blogs';
import UserDashboard from './components/UserDashboard';
import BuyBooks from './components/BuyBooks';
import RentBooks from './components/RentBooks';
import SwapBooks from './components/SwapBooks';
import Login from './components/Login';
import SignUp from './components/SignUp';
import FAQs from './components/FAQs';
import ContactUs from './components/ContactUs';
import TermsandConditions from './components/Termsandcondition';
import Checkout from './components/Checkout';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null); // Store user state (null means not logged in)
  const [books, setBooks] = useState([
    { id: 1, title: 'Book 1', author: 'Author 1', status: 'Available' },
    { id: 2, title: 'Book 2', author: 'Author 2', status: 'Available' }
  ]);
  const [swapHistory, setSwapHistory] = useState([
    { book: 'The Great Gatsby', action: 'swapped', date: '2025-01-01' },
    { book: '1984', action: 'received', date: '2025-01-05' }
  ]);
  const [messages, setMessages] = useState([
    { content: 'You have a new message!', date: '2025-01-02' }
  ]);

  // Handle user login
  const handleLogin = (userInfo) => {
    setUser(userInfo); // Set user data after login
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null); // Clear user data on logout
  };

  const handleEditProfile = (updatedInfo) => {
    setUser({ ...user, ...updatedInfo });
  };

  const handleAddBook = () => {
    setBooks([...books, { id: books.length + 1, title: 'New Book', author: 'Author', status: 'Available' }]);
  };

  const handleRemoveBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleEditBook = (id) => {
    alert(`Edit book with ID: ${id}`);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID_HERE">
      <Router>
        <div>
          <Nav user={user} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blog />} />
            <Route
              path="/userdashboard"
              element={user ? (
                <UserDashboard
                  user={user}
                  books={books}
                  swapHistory={swapHistory}
                  messages={messages}
                  onEditProfile={handleEditProfile}
                  onAddBook={handleAddBook}
                  onRemoveBook={handleRemoveBook}
                  onEditBook={handleEditBook}
                />
              ) : (
                <Navigate to="/login" />
              )}
            />
            <Route path="/buybooks" element={<BuyBooks />} />
            <Route path="/rentbooks" element={<RentBooks />} />
            <Route path="/swapbooks" element={<SwapBooks />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/termsandconditions" element={<TermsandConditions />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
