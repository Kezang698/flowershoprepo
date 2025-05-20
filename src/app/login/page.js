'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/LoginPage.css'; // Your CSS file

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please fill in both email and password.');
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Invalid credentials. Try again.');
        return;
      }

      setSuccessMsg(data.message || 'Login successful!');

      // Custom redirect logic based on provided credentials
      if (email === 'kelz248@gmail.com' && password === '87654321') {
        router.push('/admin');  // Redirect admin user
      } else {
        router.push('/');       // Redirect all other users to home page
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to Blossom Haven</h2>

        {errorMsg && <div className="alert error">{errorMsg}</div>}
        {successMsg && <div className="alert success">{successMsg}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{' '}
          <a href="/register" className="login-link">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
