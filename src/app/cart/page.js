"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UserNav from '../components/UserNav';
import { FaTrash, FaShoppingCart, FaLock, FaTruck, FaTag } from 'react-icons/fa';

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [removingItem, setRemovingItem] = useState(null);
  const [notification, setNotification] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('free');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    return shippingMethod === 'express' ? 10 : 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    return subtotal - discount + shipping;
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    
    // Add animation class
    const quantityElement = document.querySelector(`[data-item-id="${itemId}"] .quantity`);
    if (quantityElement) {
      quantityElement.classList.add('changing');
      setTimeout(() => quantityElement.classList.remove('changing'), 300);
    }
    
    showNotification('Cart updated successfully');
    setIsUpdating(false);
  };

  const removeFromCart = (itemId) => {
    setRemovingItem(itemId);
    setTimeout(() => {
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      setRemovingItem(null);
      showNotification('Item removed from cart');
    }, 500);
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      showNotification('Please enter a coupon code', 'error');
      return;
    }

    // Simulate coupon validation
    if (couponCode.toLowerCase() === 'welcome10') {
      const subtotal = calculateSubtotal();
      const newDiscount = subtotal * 0.1; // 10% discount
      setDiscount(newDiscount);
      showNotification('Coupon applied successfully!');
    } else {
      showNotification('Invalid coupon code', 'error');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showNotification('Your cart is empty', 'error');
      return;
    }
    router.push('/checkout');
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <main className="cart-page">
      <UserNav />
      <div className="container">
        <h1 className="heading">Shopping <span>Cart</span></h1>
        
        {notification && (
          <div className={`cart-notification ${notification.type}`}>
            {notification.type === 'success' ? (
              <i className="fas fa-check-circle"></i>
            ) : (
              <i className="fas fa-exclamation-circle"></i>
            )}
            {notification.message}
          </div>
        )}
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart"></i>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <button 
              className="continue-shopping"
              onClick={() => router.push('/')}
            >
              <FaShoppingCart /> Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className={`cart-item ${removingItem === item.id ? 'removing' : ''} ${isUpdating ? 'updating' : ''}`}
                  data-item-id={item.id}
                >
                  <div 
                    className="item-image"
                    onClick={() => handleProductClick(item.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${item.name} details`}
                  >
                    <img src={item.image} alt={item.name} />
                    <div className="image-overlay">
                      <span>View Details</span>
                    </div>
                  </div>
                  <div 
                    className="item-details"
                    onClick={() => handleProductClick(item.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <h3>{item.name}</h3>
                    <div className="price">
                      Nu. {item.price.toFixed(2)}
                      {item.originalPrice && (
                        <span>Nu. {item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    {item.originalPrice && (
                      <span className="discount">
                        {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                      </span>
                    )}
                    <div className="item-stock">
                      <span className={`stock-indicator ${item.inStock ? 'in-stock' : ''}`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item.id, item.quantity - 1);
                      }}
                      disabled={item.quantity <= 1 || isUpdating}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item.id, item.quantity + 1);
                      }}
                      disabled={!item.inStock || isUpdating}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    Nu. {(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(item.id);
                    }}
                    disabled={isUpdating}
                    aria-label="Remove item from cart"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h3>Order Summary</h3>
              
              <div className="coupon-section">
                <div className="coupon-input">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    aria-label="Coupon code"
                  />
                  <button
                    className="apply-coupon-btn"
                    onClick={applyCoupon}
                    disabled={!couponCode.trim() || isUpdating}
                  >
                    <FaTag /> Apply
                  </button>
                </div>
              </div>

              <div className="shipping-section">
                <h4>Shipping Method</h4>
                <div className="shipping-options">
                  <label className="shipping-option">
                    <input
                      type="radio"
                      name="shipping"
                      value="free"
                      checked={shippingMethod === 'free'}
                      onChange={() => setShippingMethod('free')}
                    />
                    <span>Free Shipping (5-7 days)</span>
                  </label>
                  <label className="shipping-option">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                    />
                    <span>Express Shipping (2-3 days) - Nu. 10.00</span>
                  </label>
                </div>
              </div>

              <div className="summary-details">
                <div className="summary-item">
                  <span>Subtotal</span>
                  <span>Nu. {calculateSubtotal().toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="summary-item discount">
                    <span>Discount</span>
                    <span>-Nu. {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-item">
                  <span>Shipping</span>
                  <span>Nu. {calculateShipping().toFixed(2)}</span>
                </div>
                <div className="summary-item total">
                  <span>Total</span>
                  <span>Nu. {calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || isUpdating}
              >
                <FaLock /> Proceed to Checkout
              </button>

              <div className="cart-actions">
                <button
                  className="continue-shopping"
                  onClick={() => router.push('/')}
                >
                  <FaShoppingCart /> Continue Shopping
                </button>
                <button
                  className="view-wishlist"
                  onClick={() => router.push('/wishlist')}
                >
                  View Wishlist
                </button>
              </div>

              <div className="secure-checkout">
                <FaLock /> Secure Checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 