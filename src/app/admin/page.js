'use client';

import React, { useState, useEffect } from 'react';
import '../styles/LoginPage.css'; // Reusing the same CSS file

export default function AdminDashboard() {
  const [flowers, setFlowers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null
  });
  const [preview, setPreview] = useState('');
  const [activeTab, setActiveTab] = useState('flowers');

  // Mock data initialization
  useEffect(() => {
    // Simulate fetching flowers
    setFlowers([
      { id: 1, name: 'Rose Bouquet', price: 2493.58, image: '/rose.jpg' },
      { id: 2, name: 'Tulip Arrangement', price: 2077.91, image: '/tulip.jpg' }
    ]);

    // Simulate fetching orders
    setOrders([
      { id: 1, user: 'user1@example.com', flower: 'Rose Bouquet', quantity: 2, total: 4987.16, date: '2023-05-15' },
      { id: 2, user: 'user2@example.com', flower: 'Tulip Arrangement', quantity: 1, total: 2077.91, date: '2023-05-16' }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }
  };

  const handleAddFlower = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.price || !formData.image) {
      alert('Please fill all fields');
      return;
    }
  
    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('price', formData.price);
    fd.append('image', formData.image);
  
    try {
      const response = await fetch('/api/flowers', {
        method: 'POST',
        body: fd,
      });
  
      if (!response.ok) throw new Error('Failed to create flower');
  
      const newFlower = await response.json();
      setFlowers([...flowers, newFlower]);
      setFormData({ name: '', price: '', image: null });
      setPreview('');
    } catch (error) {
      console.error('Error adding flower:', error);
      alert('Failed to add flower: ' + error.message);
    }
  };
  

// Image upload helper function
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('Image upload failed');
  }
  
  const data = await response.json();
  return data.url;
}
  const handleDeleteFlower = (id) => {
    setFlowers(flowers.filter(flower => flower.id !== id));
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Blossom Haven Admin Dashboard</h1>
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'flowers' ? 'active' : ''}`}
            onClick={() => setActiveTab('flowers')}
          >
            Manage Flowers
          </button>
          <button 
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            View Orders
          </button>
        </div>
      </div>

      {activeTab === 'flowers' ? (
        <div className="admin-content">
          <div className="flower-form-container">
            <h2 className="section-title">Add New Flower</h2>
            <form className="admin-form" onSubmit={handleAddFlower}>
              <div className="form-group">
                <label className="form-label">Flower Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Price (Nu.)</label>
                <input
                  type="number"
                  name="price"
                  className="form-input"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-input"
                  onChange={handleImageChange}
                  required
                />
                {preview && (
                  <div className="image-preview">
                    <img src={preview} alt="Preview" className="preview-image" />
                  </div>
                )}
              </div>
              <button type="submit" className="login-button">
                Add Flower
              </button>
            </form>
          </div>

          <div className="flower-list-container">
            <h2 className="section-title">Current Flowers</h2>
            <div className="flower-grid">
              {flowers.map(flower => (
                <div key={flower.id} className="flower-card">
                  <div className="flower-image-container">
                    <img src={flower.image} alt={flower.name} className="flower-image" />
                  </div>
                  <div className="flower-details">
                    <h3 className="flower-name">{flower.name}</h3>
                    <p className="flower-price">Nu. {flower.price.toFixed(2)}</p>
                    <button 
                      onClick={() => handleDeleteFlower(flower.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-content">
          <h2 className="section-title">Customer Orders</h2>
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Email</th>
                  <th>Flower</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user}</td>
                    <td>{order.flower}</td>
                    <td>{order.quantity}</td>
                    <td>Nu. {order.total.toFixed(2)}</td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}