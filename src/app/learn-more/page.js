"use client";

import { useEffect } from 'react';

export default function LearnMore() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="learn-more-page">
      {/* Hero Section */}
      <section className="learn-more-hero">
        <div className="hero-content">
          <h1>Discover <span>Blossom Shop</span></h1>
          <p>Your Premier Destination for Exquisite Floral Arrangements</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="LearnMore">
        <div className="learn-more-container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src="fresh.jpg" alt="Fresh Quality Flowers" className="feature-icon-img" />
                {/* <i className="fas fa-flower"></i>
                <i className="fas fa-leaf"></i> */}
              </div>
              <h3>Fresh & Quality</h3>
              <p>We source our flowers from the finest local and international growers, ensuring the highest quality and freshness for every arrangement.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src="/deliver.jpg" alt="Fast Delivery" className="feature-icon-img" />
              </div>
              <h3>Fast Delivery</h3>
              <p>Our efficient delivery system ensures your flowers arrive fresh and on time, with careful handling throughout the journey.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src="/care.jpg" alt="Customer Care" className="feature-icon-img" />
              </div>
              <h3>Customer Care</h3>
              <p>We're dedicated to providing exceptional service, with a team ready to assist you with any special requests or concerns.</p>
            </div>
          </div>

          <div className="stats-container">
            <div className="stat-item">
              <h2>10+</h2>
              <p>Years of Experience</p>
            </div>
            <div className="stat-item">
              <h2>5000+</h2>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h2>24/7</h2>
              <p>Customer Support</p>
            </div>
          </div>

          <div className="testimonial-container">
            <div className="testimonial-header">
              <h2>What Our Customers Say</h2>
              <p>Don't just take our word for it - hear from our satisfied customers</p>
            </div>
            <div className="testimonial-grid">
              <div className="testimonial-card">
                <div className="quote-icon"><i className="fas fa-quote-left"></i></div>
                <p>"The flowers were absolutely stunning! They arrived fresh and lasted longer than expected. Will definitely order again!"</p>
                <div className="testimonial-author">
                  <img src="/cus1.jpg" alt="Customer" />
                  <div>
                    <h4>Tenzin Chophel</h4>
                    <span>Regular Customer</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="quote-icon"><i className="fas fa-quote-left"></i></div>
                <p>"Amazing service! The team went above and beyond to create the perfect arrangement for my mother's birthday."</p>
                <div className="testimonial-author">
                  <img src="/cus2.jpg" alt="Customer" />
                  <div>
                    <h4>Sonam Dechen Yangzom</h4>
                    <span>Happy Customer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Content */}
          <div className="about-story">
            <h2>Our Story</h2>
            <div className="story-content">
              <div className="story-text">
                <p>Founded in 2014, Blossom Shop began with a simple passion for bringing joy through beautiful flowers. What started as a small local shop has grown into a beloved destination for floral arrangements, serving thousands of happy customers.</p>
                <p>Our commitment to quality, creativity, and customer satisfaction has remained unchanged throughout our journey. We believe that every flower tells a story, and we're here to help you tell yours.</p>
              </div>
              <div className="story-image">
                <img src="/story.jpg" alt="Our Story" />
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h2>Ready to Experience the Blossom Difference?</h2>
            <p>Explore our collection and find the perfect arrangement for your special moments.</p>
            <a href="/#Products" className="btn">
              <i className="fas fa-shopping-cart"></i> Shop Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 