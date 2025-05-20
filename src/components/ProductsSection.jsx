'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: 'Lilies',
      image: '/flower1.jpg',
      price: 12.99,
      originalPrice: 15,
      discount: 10
    },
    {
      id: 2,
      name: 'Rose',
      image: '/flower2.jpg',
      price: 12.99,
      originalPrice: 15,
      discount: 15
    },
    // Add more products here...
  ];

  const addToWishlist = (product) => {
    // Implement wishlist functionality
    console.log('Added to wishlist:', product);
  };

  const addToCart = (product) => {
    // Implement cart functionality
    console.log('Added to cart:', product);
  };

  return (
    <section className="Products" id="Products">
      <h1 className="heading">
        latest <span>products</span>
      </h1>

      <div className="box-container">
        {products.map((product) => (
          <div className="box" key={product.id}>
            <span className="discount">-{product.discount}%</span>
            <div className="image">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
              />

              <div className="icons">
                <a
                  href="#"
                  className="fas fa-heart add-to-wishlist"
                  onClick={(e) => {
                    e.preventDefault();
                    addToWishlist(product);
                  }}
                  title="Add to Wishlist"
                />
                <a
                  href="#"
                  className="cart-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                >
                  add to cart
                </a>
                <a href="#" className="fas fa-share" />
              </div>
            </div>
            <div className="content">
              <h3>{product.name}</h3>
              <div className="price">
                ${product.price} <span>${product.originalPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection; 