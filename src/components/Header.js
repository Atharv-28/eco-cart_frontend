import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center fw-bold text-success" to="/">
          <img
            src="/eco-cart.png"
            alt="Eco-Cart Logo"
            style={{ height: '40px', width: '40px', marginRight: '10px' }}
          />
          Eco-Cart
        </NavLink>
        
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
              <NavLink to="/" className="nav-link" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Get-Rating" className="nav-link">
                Get Rating
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Lens-Search" className="nav-link">
                Lens Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/About-Us" className="nav-link">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/AdminDashboard" className="nav-link">
              AdminDashboard
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
