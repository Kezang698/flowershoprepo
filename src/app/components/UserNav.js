"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserNav() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Load cart count
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      setCartCount(cartItems.length);
    }

    // Load wishlist count
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlistItems = JSON.parse(savedWishlist);
      setWishlistCount(wishlistItems.length);
    }
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <div className="user-nav">
      <div className="user-nav-container">
        <Link 
          href="/wishlist" 
          className={`nav-item ${isActive('/wishlist') ? 'active' : ''}`}
        >
          <i className="fas fa-heart"></i>
          <span>Wishlist</span>
          {wishlistCount > 0 && (
            <span className="badge">{wishlistCount}</span>
          )}
        </Link>

        <Link 
          href="/cart" 
          className={`nav-item ${isActive('/cart') ? 'active' : ''}`}
        >
          <i className="fas fa-shopping-cart"></i>
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="badge">{cartCount}</span>
          )}
        </Link>

        <Link 
          href="/account" 
          className={`nav-item ${isActive('/account') ? 'active' : ''}`}
        >
          <i className="fas fa-user"></i>
          <span>Account</span>
        </Link>
      </div>
    </div>
  );
} 