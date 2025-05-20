'use client';

import Image from 'next/image';
import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Implement form submission logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="Contact" id="Contact">
      <h1 className="heading">
        <span>Contact</span>
      </h1>

      <div className="row">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="box"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="box"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="number"
            placeholder="number"
            className="box"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            className="box"
            placeholder="message"
            value={formData.message}
            onChange={handleChange}
            cols="30"
            rows="10"
            required
          ></textarea>
          <button type="submit" className="btn">
            send message
          </button>
        </form>

        <div className="image">
          <Image
            src="/pay.jpg"
            alt="Contact"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 