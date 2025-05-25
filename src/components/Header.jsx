'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaHeart, FaShoppingCart, FaUser, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

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

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  const handleSearch = () => {
    const productsSection = document.getElementById('Products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      const flowerCards = document.querySelectorAll('.Products .box');
      let found = false;
      flowerCards.forEach(card => {
        const name = card.querySelector('.content h3')?.textContent?.toLowerCase();
        if (name && name.includes(searchQuery.toLowerCase())) {
          card.style.boxShadow = '0 0 0 4px #e84393';
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          found = true;
        } else {
          card.style.boxShadow = '';
        }
      });
      if (!found) {
        console.log('Setting error message for unavailable flower:', searchQuery);
        setErrorMsg(`Sorry, "${searchQuery}" is not available.`);
        setTimeout(() => setErrorMsg(''), 3000); // Clear after 3s
      }
    }, 500);
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setShowModal(false);
    window.location.reload();
  };

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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button className="search-button" onClick={handleSearch}>
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
          {user && user.name && (
            <div
              className="user-initials"
              title={user.name}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#e84393',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                marginLeft: '10px',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
              onClick={() => setShowModal(true)}
            >
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>
      </div>
      {errorMsg && (
        <div style={{
          color: '#dc3545',
          marginTop: '0.5rem',
          fontSize: '1.2rem',
          background: '#fff0f0',
          border: '1px solid #dc3545',
          borderRadius: '4px',
          padding: '0.5rem 1rem',
          zIndex: 9999,
          position: 'relative',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(220,53,69,0.08)'
        }}>
          {errorMsg}
        </div>
      )}
      {showModal && user && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            ref={modalRef}
            style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '2rem 2.5rem',
              minWidth: '300px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                color: '#e84393',
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#e84393',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                textTransform: 'uppercase',
              }}
            >
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 style={{ margin: '0.5rem 0 0.2rem' }}>{user.name}</h2>
            <p style={{ color: '#888', margin: 0 }}>{user.email}</p>
            <button
              onClick={handleLogout}
              style={{
                marginTop: '1.5rem',
                background: '#e84393',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                padding: '0.7rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(232,67,147,0.08)',
                transition: 'background 0.2s',
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 