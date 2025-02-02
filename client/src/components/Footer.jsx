import React from 'react';
import { Link } from 'react-router-dom';  // Import the Link component
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Book Swap Hub Description */}
        <div className="footer-description">
          <h3>Book Swap Hub</h3>
          <p>
            At Book Swap Hub, you can sell, rent, or swap books and leave reviews. Join our community and discover the joy of sharing books!
          </p>
          <div className="social-icons">
            <a href="#"><img src="https://static.vecteezy.com/system/resources/thumbnails/042/127/195/small/round-square-black-and-blue-facebook-logo-with-thick-white-border-and-shadow-on-a-transparent-background-free-png.png" alt="Facebook" /></a>
            <a href="#"><img src="https://e7.pngegg.com/pngimages/667/931/png-clipart-x-mark-check-mark-computer-icons-cross-sign-angle-text.png" alt="Twitter" /></a>
            <a href="#"><img src="https://i.pinimg.com/1200x/24/37/73/2437730f7e3a5705e205e67fa2cd1020.jpg" alt="Instagram" /></a>
            <a href="#"><img src="https://png.pngtree.com/element_our/sm/20180626/sm_5b32228a51bb7.jpg" alt="LinkedIn" /></a>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="footer-links">
          <h3>Helpful Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li> {/* Change <a> to <Link> */}
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/swapbooks">Swap Books</Link></li>
            <li><Link to="/rentbooks">Rent Books</Link></li>
            <li><Link to="/sellbooks">Sell Books</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
          </ul>
        </div>

        {/* Reach Us */}
        <div className="footer-contact">
          <h3>Reach Us</h3>
          <p>Phone: (555) 123 - 4567</p>
          <p>Email: info@bookswaphub.com</p>
          <p>Address: 456 Oak Ave. Denver, CO</p>
          <p>Hours: Mon - Fri: 9:00am - 5:00pm</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Book Swap Hub, All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
