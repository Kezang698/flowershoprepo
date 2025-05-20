'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserNav from '../components/UserNav';

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // TODO: Implement actual login logic
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    setIsLoggedIn(false);
  };

  return (
    <main className="account-page">
      <UserNav />
      <div className="container">
        <h1 className="heading">My <span>Account</span></h1>
        
        {!isLoggedIn ? (
          <div className="auth-container">
            <div className="auth-card">
              <h2>Welcome Back!</h2>
              <p>Sign in to access your account</p>
              <button 
                className="auth-btn"
                onClick={handleLogin}
                aria-label="Sign in to your account"
              >
                Sign In
              </button>
            </div>
          </div>
        ) : (
          <div className="account-dashboard">
            <div className="dashboard-card">
              <h2>Account Overview</h2>
              <div className="dashboard-stats">
                <div className="stat-item">
                  <i className="fas fa-shopping-bag"></i>
                  <span>Recent Orders</span>
                  <strong>0</strong>
                </div>
                <div className="stat-item">
                  <i className="fas fa-heart"></i>
                  <span>Wishlist Items</span>
                  <strong>0</strong>
                </div>
                <div className="stat-item">
                  <i className="fas fa-star"></i>
                  <span>Reward Points</span>
                  <strong>0</strong>
                </div>
              </div>
              <button 
                className="logout-btn"
                onClick={handleLogout}
                aria-label="Sign out of your account"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 