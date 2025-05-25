'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../lib/UserContext';
import UserNav from '../components/UserNav';
import { FaLock, FaCreditCard, FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa';
import styles from './page.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, requireAuth } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check authentication
    if (!requireAuth()) {
      return;
    }

    // Load cart items
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      router.push('/cart');
    }
  }, [requireAuth, router]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1: // Shipping Information
        const requiredShippingFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
        return requiredShippingFields.every(field => formData[field].trim());
      case 2: // Payment Information
        const requiredPaymentFields = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];
        return requiredPaymentFields.every(field => formData[field].trim());
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (!validateStep()) {
      setError('Please fill in all required fields');
      return;
    }
    setError(null);
    setStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create order for each item in cart
      const orderPromises = cartItems.map(item => 
        fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            flowerId: item.id,
            quantity: item.quantity,
            total: item.price * item.quantity,
            shippingInfo: {
              fullName: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
            }
          }),
        })
      );

      await Promise.all(orderPromises);

      // Clear cart
      localStorage.removeItem('cart');
      
      // Redirect to success page
      router.push('/checkout/success');
    } catch (error) {
      setError('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return null; // Will redirect to login/register
  }

  return (
    <main className={styles['checkout-page']}>
      <UserNav />
      <div className={styles.container}>
        <h1 className={styles.heading}>Checkout</h1>

        {error && (
          <div className={styles['error-message']}>
            {error}
          </div>
        )}

        <div className={styles['checkout-container']}>
          <div className={styles['checkout-steps']}>
            <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
              <FaMapMarkerAlt />
              <span>Shipping</span>
            </div>
            <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
              <FaCreditCard />
              <span>Payment</span>
            </div>
            <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
              <FaShoppingBag />
              <span>Review</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles['checkout-form']}>
            {step === 1 && (
              <div className={styles['form-section']}>
                <h2>Shipping Information</h2>
                <div className={styles['form-grid']}>
                  <div className={styles['form-group']}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles['form-group']}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles['form-group']}>
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={`${styles['form-group']} ${styles['full-width']}`}>
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles['form-group']}>
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles['form-group']}>
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles['form-group']}>
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles['form-section']}>
                <h2>Payment Information</h2>
                <div className={styles['form-grid']}>
                  <div className={`${styles['form-group']} ${styles['full-width']}`}>
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className={`${styles['form-group']} ${styles['full-width']}`}>
                    <label>Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles['form-group']}>
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className={styles['form-group']}>
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles['form-section']}>
                <h2>Review Order</h2>
                <div className={styles['order-summary']}>
                  <h3>Order Items</h3>
                  {cartItems.map(item => (
                    <div key={item.id} className={styles['order-item']}>
                      <span>{item.name} x {item.quantity}</span>
                      <span>Nu. {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className={styles['order-total']}>
                    <span>Total</span>
                    <span>Nu. {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className={styles['shipping-summary']}>
                  <h3>Shipping Information</h3>
                  <p>{formData.fullName}</p>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                </div>
              </div>
            )}

            <div className={styles['checkout-actions']}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className={styles['back-button']}
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className={styles['next-button']}
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={styles['submit-button']}
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : (
                    <>
                      <FaLock /> Place Order
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 