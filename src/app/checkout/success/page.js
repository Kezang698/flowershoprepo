'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserNav from '../../components/UserNav';
import { FaCheckCircle, FaShoppingBag, FaHome } from 'react-icons/fa';

export default function CheckoutSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Clear cart after successful order
    localStorage.removeItem('cart');
  }, []);

  return (
    <main className="checkout-success-page">
      <UserNav />
      <div className="container">
        <div className="success-container">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been received and is being processed.</p>
          
          <div className="success-actions">
            <button
              onClick={() => router.push('/orders')}
              className="view-orders-btn"
            >
              <FaShoppingBag /> View Orders
            </button>
            <button
              onClick={() => router.push('/')}
              className="continue-shopping-btn"
            >
              <FaHome /> Return Home
            </button>
          </div>

          <div className="order-info">
            <h2>What's Next?</h2>
            <ul>
              <li>You will receive an order confirmation email shortly.</li>
              <li>We will process your order and prepare it for shipping.</li>
              <li>You can track your order status in your account.</li>
              <li>If you have any questions, please contact our support team.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 