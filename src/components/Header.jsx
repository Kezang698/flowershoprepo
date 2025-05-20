'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHeart, FaShoppingCart, FaUser, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu when clicking a link
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of the header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['Home', 'About', 'Products', 'Review', 'Contact'];
      const scrollPosition = window.scrollY + 100; // Add offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        {/* Mobile Menu Button */}
        <button className="mobile-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <h1>Flower<span className="logo-dot">.</span></h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <a 
            href="#Home" 
            className={`nav-link ${activeSection === 'Home' ? 'active' : ''}`} 
            onClick={(e) => handleScrollToSection(e, 'Home')}
          >
            Home
          </a>
          <a 
            href="#About" 
            className={`nav-link ${activeSection === 'About' ? 'active' : ''}`} 
            onClick={(e) => handleScrollToSection(e, 'About')}
          >
            About
          </a>
          <a 
            href="#Products" 
            className={`nav-link ${activeSection === 'Products' ? 'active' : ''}`} 
            onClick={(e) => handleScrollToSection(e, 'Products')}
          >
            Products
          </a>
          <a 
            href="#Review" 
            className={`nav-link ${activeSection === 'Review' ? 'active' : ''}`} 
            onClick={(e) => handleScrollToSection(e, 'Review')}
          >
            Review
          </a>
          <a 
            href="#Contact" 
            className={`nav-link ${activeSection === 'Contact' ? 'active' : ''}`} 
            onClick={(e) => handleScrollToSection(e, 'Contact')}
          >
            Contact
          </a>
        </nav>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Flowers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">
            <span>🔍</span>
          </button>
        </div>

        {/* User Actions */}
        <div className="user-actions">
          <div className="delivery-location">
            <FaMapMarkerAlt />
            <select defaultValue="Thimphu">
              <option value="Thimphu">Thimphu</option>
              <option value="Paro">Paro</option>
              <option value="Punakha">Punakha</option>
            </select>
          </div>
          <Link href="/wishlist" className="icon-button">
            <FaHeart />
          </Link>
          <Link href="/cart" className="icon-button">
            <FaShoppingCart />
          </Link>
          <Link href="/login" className="icon-button">
            <FaUser />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 