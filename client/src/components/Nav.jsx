import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Checkout from './Checkout';

const Nav = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            Book Swap Hub
          </Link>
        </div>
        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >

        </button>
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          {[
            { title: 'About', links: ['About', 'Blogs'] },
            { title: 'Books', links: ['BuyBooks', 'Rent Books', 'Swap Books'] },
            { title: 'User', links: ['UserDashboard', 'Sign Up', 'Login','Checkout'] },
            { title: 'Help', links: ['FAQs', 'Contact Us'] },
            { title: 'Legal', links: ['Privacy Policies', 'Terms and Conditions'] },
          ].map((menu) => (
            <li key={menu.title} className="navbar-item">
              <button
                className="navbar-button"
                onClick={() => toggleDropdown(menu.title)}
                aria-expanded={openDropdown === menu.title ? 'true' : 'false'}
                aria-controls={`dropdown-${menu.title}`}
                aria-haspopup="true"
              >
                {menu.title}
              </button>
              <ul
                id={`dropdown-${menu.title}`}
                className={`dropdown-menu ${openDropdown === menu.title ? 'show' : ''}`}
              >
                {menu.links.map((link) => (
                  <li key={link} className="dropdown-item">
                    <Link to={`/${link.replace(/\s+/g, '').toLowerCase()}`} className="dropdown-link">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
