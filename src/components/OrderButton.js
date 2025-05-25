'use client';

import { useState } from 'react';
import { useUser } from '../lib/UserContext';

export default function OrderButton({ flower }) {
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const { user, requireAuth } = useUser();

  const handleOrder = async () => {
    // Check if user is authenticated
    if (!requireAuth()) {
      return; // User will be redirected to register page
    }

    setIsOrdering(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flowerId: flower.id,
          quantity,
          total: flower.price * quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      // Show success message or redirect to order confirmation
      alert('Order placed successfully!');
    } catch (error) {
      alert(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="order-controls">
      <div className="quantity-control">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          className="quantity-btn"
        >
          -
        </button>
        <span className="quantity">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="quantity-btn"
        >
          +
        </button>
      </div>
      <button
        onClick={handleOrder}
        disabled={isOrdering}
        className="order-button"
      >
        {isOrdering ? 'Ordering...' : 'Order Now'}
      </button>
    </div>
  );
} 