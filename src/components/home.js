import React, { useState } from "react";
import '../styles/home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="home">
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <ul className="nav-list">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/get-product-rating" className="nav-link">Get Product Rating</a></li>
          <li><a href="/about-us" className="nav-link">About Us</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to EcoWise</h1>
        <p>Discover and rate eco-friendly products for a better tomorrow.</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>
    </div>
  );
}

export default Home;
