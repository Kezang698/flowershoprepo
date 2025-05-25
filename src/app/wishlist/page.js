"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UserNav from '../components/UserNav';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const router = useRouter();
  const [products] = useState([
    { id: 1, name: 'Lilies', price: 1080.00, originalPrice: 1247.25, discount: 10, image: '/flower1.jpg' },
    { id: 2, name: 'Rose', price: 1080.00, originalPrice: 1247.25, discount: 15, image: '/flower2.jpg' },
    { id: 3, name: 'Sunny', price: 1080.00, originalPrice: 1247.25, discount: 15, image: '/flower3.jpg' },
    { id: 4, name: 'Jasmine', price: 1080.00, originalPrice: 1247.25, discount: 10, image: '/flower4.jpg' },
    { id: 5, name: 'Benjamine', price: 1080.00, originalPrice: 1247.25, discount: 20, image: '/flower5.jpg' },
    { id: 6, name: 'Rebilin', price: 1080.00, originalPrice: 1247.25, discount: 5, image: '/flower6.jpg' },
    { id: 7, name: 'CherryB', price: 1080.00, originalPrice: 1247.25, discount: 12, image: '/flower7.jpg' },
    { id: 8, name: 'Japens', price: 1080.00, originalPrice: 1247.25, discount: 10, image: '/flower8.jpg' },
    { id: 9, name: 'Bluber', price: 1080.00, originalPrice: 1247.25, discount: 18, image: '/flower9.jpg' },
  ]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlistIds = JSON.parse(savedWishlist);
      const items = products.filter(product => wishlistIds.includes(product.id));
      setWishlistItems(items);
    }
  }, [products]);

  const removeFromWishlist = (productId) => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlistIds = JSON.parse(savedWishlist);
      const updatedWishlist = wishlistIds.filter(id => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlistItems(prev => prev.filter(item => item.id !== productId));
    }
  };

  const addToCart = (product) => {
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  return (
    <main className="wishlist-page">
      <UserNav />
      <div className="container">
        <h1 className="heading">My <span>Wishlist</span></h1>
        
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <i className="fas fa-heart"></i>
            <h2>Your wishlist is empty</h2>
            <p>Add some beautiful flowers to your wishlist!</p>
            <Link href="/#Products" className="btn">
              <i className="fas fa-shopping-cart"></i> Browse Products
            </Link>
          </div>
        ) : (
          <div className="wishlist-container">
            {wishlistItems.map((item) => (
              <div className="wishlist-item" key={item.id}>
                <div className="item-image">
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    width={200}
                    height={200}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="price">
                    Nu. {item.price} <span>Nu. {item.originalPrice}</span>
                  </div>
                  <div className="discount">-{item.discount}%</div>
                </div>
                <div className="item-actions">
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <i className="fas fa-trash"></i> Remove
                  </button>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 