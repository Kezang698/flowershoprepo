'use client';

import Image from 'next/image';
import { useState } from 'react';

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    review: ''
  });

  const reviews = [
    {
      id: 1,
      name: 'Tenzin Chopel',
      image: '/cus1.jpg',
      rating: 5,
      review: 'Absolutely stunning flowers! The bouquet was fresh, beautifully arranged, and lasted over a week. Highly recommend!',
      type: 'happy customer'
    },
    {
      id: 2,
      name: 'Sonam Dechen',
      image: '/cus2.jpg',
      rating: 5,
      review: 'I ordered roses for my anniversary, and they were perfect!The fragrance and quality were beyond my expectations',
      type: 'happy customer'
    },
    // Add more reviews...
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', { ...reviewForm, rating });
    // Implement review submission logic here
  };

  return (
    <section className="Review" id="Review">
      <h1 className="heading">
        Customer's <span>Review</span>
      </h1>

      <div className="box-container">
        {reviews.map((review) => (
          <div className="box" key={review.id}>
            <div className="stars">
              {[...Array(review.rating)].map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
            </div>
            <p>{review.review}</p>
            <div className="user">
              <Image
                src={review.image}
                alt={review.name}
                width={60}
                height={60}
              />
              <div className="user-info">
                <h3>{review.name}</h3>
                <span>{review.type}</span>
              </div>
            </div>
            <span className="fas fa-quote-right"></span>
          </div>
        ))}

        {/* Write a Review Form */}
        <div className="box write-review-form">
          <h3 className="text-center mb-3">Write Your Own Review 🌸</h3>
          <form className="review-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="box"
              placeholder="Your Name"
              value={reviewForm.name}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              className="box"
              placeholder="Your Email"
              value={reviewForm.email}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, email: e.target.value })
              }
              required
            />
            <textarea
              className="box"
              rows="4"
              placeholder="Your Review"
              value={reviewForm.review}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, review: e.target.value })
              }
              required
            ></textarea>

            <div className="rating-stars mb-3">
              <label>Rating:</label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fas fa-star ${rating >= star ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                  ></i>
                ))}
              </div>
            </div>
            <button type="submit" className="btn mt-2">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection; 