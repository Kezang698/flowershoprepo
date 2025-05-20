"use client";  // Add this line to mark this file as a client component
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { RiHeartAddFill } from "react-icons/ri";

export default function Home() {
  // Add state for wishlist and cart
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Lilies', price: 12.99, originalPrice: 15, discount: 10, image: '/flower1.jpg' },
    { id: 2, name: 'Rose', price: 12.99, originalPrice: 15, discount: 15, image: '/flower2.jpg' },
    { id: 3, name: 'Sunny', price: 12.99, originalPrice: 15, discount: 15, image: '/flower3.jpg' },
    { id: 4, name: 'Jasmine', price: 12.99, originalPrice: 15, discount: 10, image: '/flower4.jpg' },
    { id: 5, name: 'Benjamine', price: 12.99, originalPrice: 15, discount: 20, image: '/flower5.jpg' },
    { id: 6, name: 'Rebilin', price: 12.99, originalPrice: 15, discount: 5, image: '/flower6.jpg' },
    { id: 7, name: 'CherryB', price: 12.99, originalPrice: 15, discount: 12, image: '/flower7.jpg' },
    { id: 8, name: 'Japens', price: 12.99, originalPrice: 15, discount: 10, image: '/flower8.jpg' },
    { id: 9, name: 'Bluber', price: 12.99, originalPrice: 15, discount: 18, image: '/flower9.jpg' },
  ]);

  // Load wishlist and cart from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    const savedCart = localStorage.getItem('cart');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save wishlist and cart to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [wishlist, cart]);

  // Toggle wishlist item
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Add to cart
  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    // Load script.js logic after component mounts
    const script = document.createElement('script')
    script.src = '/script.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  // Toggle user menu logic
  function toggleUserMenu() {
    const menu = document.getElementById('userMenu')
    if (menu) {
      menu.classList.toggle('show')
    }
  }

  return (
    <>
    
        <title>Blossom Haven - Flower Boutique</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />

        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Your global CSS */}
        <link rel="stylesheet" href="/global.css" />
     

      {/* <header>
        <input type="checkbox" id="toggler" />
        <label htmlFor="toggler" className="fas fa-bars"></label>
        <a href="#" className="logo">Flower<span>.</span></a>

        <nav className="navbar">
          <a href="#Home">Home</a>
          <a href="#About">About</a>
          <a href="#Products">Products</a>
          <a href="#Review">Review</a>
          <a href="#Contact">Contact</a>
        </nav>

        <div className="icons">
          <a href="wishlist.html"> 
            <RiHeartAddFill className="" />
          </a>
          <a href="cart.html">
            <i className="fas fa-shopping-cart"></i>
          </a>

          <div className="user-dropdown">
            <i
              className="fas fa-user dropdown-toggle"
              onClick={toggleUserMenu}
            ></i>
            <ul className="dropdown-menu-user" id="userMenu">
              <li><i className="fas fa-sign-in-alt"></i> Login / Register</li>
              <li><i className="fas fa-user-circle"></i> My Account</li>
              <li><i className="fas fa-box"></i> My Orders</li>
              <li><i className="fas fa-headset"></i> Contact Us</li>
              <li><i className="fas fa-question-circle"></i> FAQs</li>
            </ul>
          </div>
        </div>

        <form id="flowerSearchForm" className="search-bar" onSubmit={e => e.preventDefault()}>
          <input type="text" id="flowerSearchInput" placeholder="Search flowers..." />
          <button type="submit"><i className="fas fa-search"></i></button>
        </form>

        <div className="location-selector">
          <i className="fas fa-map-marker-alt"> Delivery </i>
          <select>
            <option value="thimphu">Thimphu</option>
            <option value="paro">Paro</option>
            <option value="phuntsholing">Phuntsholing</option>
          </select>
        </div>
      </header> */}

      {/* Home Section */}
      <section className="Home" id="Home">
        <div className="content">
          <h3>Fresh Flowers</h3>
          <span> Natural and beautiful Flowers </span>
          <p>Fresh and fragrant flowers for every occasion. Explore our collection now!</p>
          <a 
            href="#Products" 
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              const productsSection = document.getElementById('Products');
              if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <i className="fa fa-shopping-cart"></i> Shop Now
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="About" id="About">
        <h1 className="heading"><span> About </span> us </h1>
        <div className="row">
          <div className="video-container">
            <video src="/white.mp4" loop autoPlay muted></video>
            <h3> Best flower sellers </h3>
          </div>
          <div className="content">
            <h3> Why choose us?</h3>
            <p>We offer the finest quality flowers and deliver them directly to your doorstep with care and attention. Enjoy the freshest flowers for all your special moments.</p>
            <a 
              href="/learn-more" 
              className="btn learn-more-btn"
            >
              <i className="fas fa-arrow-right"></i> Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Icons Section */}
      <section className="icons-container">
        {['im1.jpeg', 'im2.jpg', 'im3.jpg', 'im4.jpeg'].map((src, idx) => (
          <div className="icons" key={idx}>
            <img src={`/${src}`} alt="" />
            <div className="info">
              <h3>{['Free Delivery', '10 days returns', 'offer & gifts', 'secure payments'][idx]}</h3>
              <span>{['On all orders', 'moneyback guarantee', 'On all orders', 'protected by paypal'][idx]}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Products Section */}
      <section className="Products" id="Products">
        <h1 className="heading"> latest <span> products </span></h1>
        <div className="box-container">
          {products.map((product) => (
            <div className="box" key={product.id}>
              <span className="discount">-{product.discount}%</span>
              <div className="image">
                <img src={product.image} alt={product.name} />
                <div className="icons">
                  <a 
                    href="#" 
                    className={`fas fa-heart ${wishlist.includes(product.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product.id);
                    }}
                    title={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  ></a>
                  <a 
                    href="#" 
                    className="cart-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                  >
                    Add to cart
                  </a>
                  <a href="#" className="fas fa-share"></a>
                </div>
              </div>
              <div className="content">
                <h3>{product.name}</h3>
                <div className="price">${product.price} <span>${product.originalPrice}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Review Section */}
      <section className="Review" id="Review">
        <h1 className="heading">Customer's<span> Review</span></h1>
        <div className="review-stats">
          <div className="overall-rating">
            <h2>4.8</h2>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
            </div>
            <p>Based on 156 reviews</p>
          </div>
          <div className="rating-bars">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="rating-bar">
                <span>{rating} stars</span>
                <div className="bar-container">
                  <div 
                    className="bar" 
                    style={{ width: `${[80, 15, 3, 1, 1][rating-1]}%` }}
                  ></div>
                </div>
                <span>{[80, 15, 3, 1, 1][rating-1]}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="box-container">
          {[...Array(6)].map((_, i) => (
            <div className="box review-card" key={i}>
              <div className="review-header">
                <div className="user">
                  <img src={`/cus${i + 1}.jpg`} alt="" />
                  <div className="user-info">
                    <h3>{[
                      "Tenzin Chopel",
                      "Sonam Dechen",
                      "Kala",
                      "Pema Choden",
                      "Thinley Dema",
                      "Melam Rigzang Dolma"
                    ][i]}</h3>
                    <span className="review-date">2 days ago</span>
                  </div>
                </div>
                <div className="stars">
                  {[...Array(5)].map((_, j) => (
                    <i key={j} className={`fas fa-star ${j < 4 ? 'active' : ''}`}></i>
                  ))}
                </div>
              </div>
              <p className="review-content">{[ 
                "Absolutely stunning flowers! The bouquet was fresh and beautifully arranged. The delivery was prompt and the flowers lasted longer than expected.",
                "I ordered roses for my anniversary and they were perfect! The color was vibrant and the fragrance was amazing. Will definitely order again!",
                "These flowers made my mom's birthday extra special. The arrangement was elegant and the customer service was exceptional.",
                "The flowers were vibrant and fresh, exactly as shown in the pictures. The packaging was secure and the delivery was on time.",
                "Great value for the price! The arrangement was elegant and the flowers stayed fresh for over a week. Highly recommended!",
                "I've never seen such beautiful and well-packaged flowers. The attention to detail was impressive and the delivery was perfect."
              ][i]}</p>
              <div className="review-footer">
                <button className="helpful-btn">
                  <i className="fas fa-thumbs-up"></i> Helpful ({[24, 18, 32, 15, 27, 19][i]})
                </button>
                <button className="reply-btn">
                  <i className="fas fa-reply"></i> Reply
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="write-review-container">
          <h3>Share Your Experience</h3>
          <form className="review-form" onSubmit={(e) => {
            e.preventDefault();
            // Add form submission logic here
            alert('Thank you for your review!');
          }}>
            <div className="form-group">
              <label>Your Rating</label>
              <input type="hidden" id="ratingInput" name="rating" value="0" />
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i 
                    key={star}
                    className="fas fa-star"
                    data-rating={star}
                    onMouseEnter={(e) => {
                      const rating = parseInt(e.target.dataset.rating);
                      const stars = e.target.parentElement.children;
                      const ratingInput = document.getElementById('ratingInput');
                      if (ratingInput) {
                        ratingInput.value = rating;
                      }
                      Array.from(stars).forEach((s, i) => {
                        if (i < rating) {
                          s.classList.add('active');
                        } else {
                          s.classList.remove('active');
                        }
                      });
                    }}
                    onMouseLeave={(e) => {
                      const ratingInput = document.getElementById('ratingInput');
                      const currentRating = ratingInput ? parseInt(ratingInput.value) : 0;
                      const stars = e.target.parentElement.children;
                      Array.from(stars).forEach((s, i) => {
                        if (i < currentRating) {
                          s.classList.add('active');
                        } else {
                          s.classList.remove('active');
                        }
                      });
                    }}
                    onClick={(e) => {
                      const rating = parseInt(e.target.dataset.rating);
                      const ratingInput = document.getElementById('ratingInput');
                      if (ratingInput) {
                        ratingInput.value = rating;
                      }
                      const stars = e.target.parentElement.children;
                      Array.from(stars).forEach((s, i) => {
                        if (i < rating) {
                          s.classList.add('active');
                        } else {
                          s.classList.remove('active');
                        }
                      });
                    }}
                  ></i>
                ))}
              </div>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea 
                placeholder="Share your experience with our flowers..." 
                required
                rows="4"
              ></textarea>
            </div>
            <div className="form-group">
              <label className="upload-label">
                <i className="fas fa-camera"></i> Add Photos (Optional)
                <input type="file" accept="image/*" multiple className="hidden" />
              </label>
            </div>
            <button type="submit" className="submit-review-btn">
              Submit Review
            </button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section className="Contact" id="Contact">
        <h1 className="heading"><span>Contact</span> Us</h1>
        
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-card">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Our Location</h3>
              <p>123 Flower Street, Blossom City</p>
              <p>Thimphu, Bhutan</p>
            </div>
            <div className="info-card">
              <i className="fas fa-phone-alt"></i>
              <h3>Phone Number</h3>
              <p>+975 1234 5678</p>
              <p>+975 9876 5432</p>
            </div>
            <div className="info-card">
              <i className="fas fa-envelope"></i>
              <h3>Email Address</h3>
              <p>info@blossomshop.com</p>
              <p>support@blossomshop.com</p>
            </div>
            <div className="info-card">
              <i className="fas fa-clock"></i>
              <h3>Opening Hours</h3>
              <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
              <p>Sunday: 10:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={(e) => {
              e.preventDefault();
              // Add form submission logic here
              alert('Thank you for your message! We will get back to you soon.');
            }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                  <label>Your Email</label>
                  <input type="email" placeholder="Enter your email" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="Enter your phone number" />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="Enter subject" required />
                </div>
              </div>
              <div className="form-group">
                <label>Your Message</label>
                <textarea 
                  placeholder="How can we help you?" 
                  required
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Send Message <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.464317439471!2d89.6363!3d27.4716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDI4JzE3LjgiTiA4OcKwMzgnMTAuNyJF!5e0!3m2!1sen!2sbt!4v1635000000000!5m2!1sen!2sbt"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Our Location"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
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
              <li><a href="#Home">Home</a></li>
              <li><a href="#About">About Us</a></li>
              <li><a href="#Products">Products</a></li>
              <li><a href="#Review">Reviews</a></li>
              <li><a href="#Contact">Contact</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/faq">FAQs</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Newsletter</h3>
            <p className="newsletter-text">Subscribe to our newsletter for the latest updates and offers!</p>
            <form className="newsletter-form" onSubmit={(e) => {
              e.preventDefault();
              // Add newsletter subscription logic here
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
                <a href="#" className="social-icon facebook" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                  <span className="tooltip">Facebook</span>
                </a>
                <a href="#" className="social-icon instagram" aria-label="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                  <span className="tooltip">Instagram</span>
                </a>
                <a href="#" className="social-icon twitter" aria-label="Twitter">
                  <i className="fa-brands fa-x-twitter"></i>
                  <span className="tooltip">Twitter</span>
                </a>
                <a href="#" className="social-icon pinterest" aria-label="Pinterest">
                  <i className="fa-brands fa-pinterest-p"></i>
                  <span className="tooltip">Pinterest</span>
                </a>
                <a href="#" className="social-icon youtube" aria-label="YouTube">
                  <i className="fa-brands fa-youtube"></i>
                  <span className="tooltip">YouTube</span>
                </a>
                <a href="#" className="social-icon tiktok" aria-label="TikTok">
                  <i className="fa-brands fa-tiktok"></i>
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
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
