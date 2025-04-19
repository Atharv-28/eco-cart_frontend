import React, { useState, useEffect } from 'react';
import { StarFill, Star, Link45deg } from 'react-bootstrap-icons';
import badge from "../assets/eco-badge.png";
import Chatbox from "./Chatbox"; // Import the Chatbox component
import './AnimatedCard.css'; // Add custom styles for animations

export default function AnimatedCard(props) {
  const { id, name, link, img, rating, rating_description, material, brand } = props;

  const [animatedName, setAnimatedName] = useState('');
  const [filledStars, setFilledStars] = useState(0);
  const [showChatbox, setShowChatbox] = useState(false);

  useEffect(() => {
    // Animate the name
    let nameIndex = 0;
    const nameInterval = setInterval(() => {
      if (nameIndex < name.length) {
        setAnimatedName((prev) => prev + name[nameIndex]);
        nameIndex++;
      } else {
        clearInterval(nameInterval);
      }
    }, 50); // Typing speed for the name

    // Animate the stars
    let starIndex = 0;
    const starInterval = setInterval(() => {
      if (starIndex < Math.round(rating)) {
        setFilledStars((prev) => prev + 1);
        starIndex++;
      } else {
        clearInterval(starInterval);
      }
    }, 500); // 0.5s delay for each star

    // Show chatbox after animations
    const chatboxTimeout = setTimeout(() => {
      setShowChatbox(true);
    }, 3000); // Wait for animations to complete

    return () => {
      clearInterval(nameInterval);
      clearInterval(starInterval);
      clearTimeout(chatboxTimeout);
    };
  }, [name, rating]);

  return (
    <div className="animated-card-container">
      {/* Two-door opening animation */}
      <div className={`animated-card ${showChatbox ? 'open' : ''}`}>
        {/* Product Card */}
        <div
          className="card shadow-sm h-100 product-card"
          style={{
            maxWidth: '480px',
            borderRadius: '16px',
            padding: '10px',
            transition: 'all 0.5s ease-in-out',
          }}
        >
          {/* Product Image Section */}
          <div
            className="position-relative overflow-hidden bg-light product-image-container"
            style={{
              height: '240px',
              borderRadius: '12px',
              padding: '6px',
              marginBottom: '10px',
              border: '1px solid #e0e0e0',
            }}
          >
            <img
              src={img || "/placeholder.svg"}
              alt={name}
              className="card-img-top h-100 object-fit-contain rounded product-image"
            />
            <span className="badge bg-success position-absolute top-0 start-0 m-2">{id}</span>

            {rating >= 3 && (
              <img
                src={badge}
                alt="Eco-Friendly Badge"
                className="position-absolute top-0 end-0 m-2"
                style={{ width: '48px', height: '48px' }}
              />
            )}
          </div>

          {/* Product Details Section */}
          <div className="card-body pt-1">
            <div className="d-flex justify-content-between align-items-start mb-2">
              {/* Animated Name */}
              <h5
                className="card-title mb-0"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontSize: '1.1rem',
                }}
              >
                {animatedName}
              </h5>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-primary"
              >
                <Link45deg size={20} />
              </a>
            </div>

            <hr className="my-2" />

            <p className="card-text text-muted mb-2">
              <strong>Material:</strong> {material}
            </p>
            <p className="card-text text-muted mb-2">
              <strong>Brand:</strong> {brand}
            </p>

            {/* Animated Stars */}
            <div className="d-flex align-items-center mb-2">
              <div className="d-flex me-2">
                {Array.from({ length: 5 }, (_, index) =>
                  index < filledStars ? (
                    <StarFill
                      key={index}
                      className="text-success"
                      style={{ marginRight: '2px', transition: 'all 0.3s ease-in-out' }}
                    />
                  ) : (
                    <Star
                      key={index}
                      className="text-success"
                      style={{ marginRight: '2px', transition: 'all 0.3s ease-in-out' }}
                    />
                  )
                )}
              </div>
              <span className="text-muted">({rating})</span>
            </div>

            {/* Animated Description */}
            <TypingEffect text={rating_description} />
          </div>
        </div>

        {/* Chatbox */}
        {showChatbox && <Chatbox />}
      </div>
    </div>
  );
}

// Typing Effect Component
const TypingEffect = ({ text = '' }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (typeof text !== 'string') return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <p
      className="card-text text-muted small fst-italic typing-effect"
      style={{
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        marginTop: '4px',
      }}
    >
      {displayedText}
    </p>
  );
};