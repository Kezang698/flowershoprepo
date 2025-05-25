'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="contact-list">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <strong>Address:</strong>
                <p>123 Flower Street, Blossom City, Thimphu, Bhutan</p>
              </div>
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              <div>
                <strong>Phone:</strong>
                <p>+975 1234 5678</p>
                <p>+975 9876 5432</p>
              </div>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <div>
                <strong>Email:</strong>
                <p>info@blossomshop.com</p>
                <p>support@blossomshop.com</p>
              </div>
            </li>
            <li>
              <i className="fas fa-clock"></i>
              <div>
                <strong>Opening Hours:</strong>
                <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                <p>Sunday: 10:00 AM - 6:00 PM</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="quick-links">
            <li><Link href="/#Home">Home</Link></li>
            <li><Link href="/#About">About Us</Link></li>
            <li><Link href="/#Products">Products</Link></li>
            <li><Link href="/#Review">Reviews</Link></li>
            <li><Link href="/#Contact">Contact</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <p className="newsletter-text">Subscribe to our newsletter for the latest updates and offers!</p>
          <form className="newsletter-form" onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
          }}>
            <div className="input-group">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </form>
          <div className="social-links">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
                <span className="tooltip">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
                <span className="tooltip">Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
                <span className="tooltip">Twitter</span>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon pinterest" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
                <span className="tooltip">Pinterest</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon youtube" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
                <span className="tooltip">YouTube</span>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon tiktok" aria-label="TikTok">
                <i className="fab fa-tiktok"></i>
                <span className="tooltip">TikTok</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Payment Methods</h3>
          <div className="payment-methods">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-apple-pay"></i>
          </div>
          <div className="app-download">
            <h4>Download Our App</h4>
            <div className="app-buttons">
              <a href="#" className="app-button">
                <i className="fab fa-google-play"></i>
                <span>Google Play</span>
              </a>
              <a href="#" className="app-button">
                <i className="fab fa-apple"></i>
                <span>App Store</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 Blossom Shop. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 