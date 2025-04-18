// src/components/Header.js
import React from 'react';
import GetRating from '../pages/GetRating';
import LensSearch from '../pages/LensSearch';
import AboutUs from '../pages/AboutUs';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import './Header.css';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3">
      <div className="container">
        <a className="navbar-brand fw-bold text-success" href="#">Eco-Cart</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="Get-Rating">Get Rating</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="Lens-Search">Lens Search</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="About-Us">About us</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
