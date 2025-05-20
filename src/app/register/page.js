'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/LoginPage.css'; // Reusing the same CSS file

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
  e.preventDefault();

  setErrorMsg('');
  setSuccessMsg('');

  if (!name || !email || !password || !confirmPassword) {
    setErrorMsg('Please fill in all fields.');
    return;
  }

  if (password !== confirmPassword) {
    setErrorMsg('Passwords do not match.');
    return;
  }

  if (password.length < 8) {
    setErrorMsg('Password must be at least 8 characters long.');
    return;
  }

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrorMsg(data.error || 'Registration failed. Please try again later.');
      return;
    }

    setSuccessMsg('Registration successful! Redirecting to login...');
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (error) {
    setErrorMsg('Registration failed. Please try again later.');
  }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Join Blossom Haven</h2>

        {errorMsg && (
          <div className="alert error">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="alert success">
            {successMsg}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <small className="form-hint">(Minimum 8 characters)</small>
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="login-button"
          >
            Register
          </button>
        </form>

        <p className="login-footer">
          Already have an account?{' '}
          <a href="/login" className="login-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}