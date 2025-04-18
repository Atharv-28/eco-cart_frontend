import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-light text-center text-lg-start shadow-sm mt-5 pt-4">
      <div className="container text-center text-md-start">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-success fw-bold">Eco-Cart</h5>
            <p className="text-muted">
              Sustainable choices, smarter living. Eco-friendly products for a better tomorrow.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-muted footer-link">Home</a></li>
              <li><a href="/Get-Rating" className="text-muted footer-link">Get Rating</a></li>
              <li><a href="/Lens-Search" className="text-muted footer-link">Lens Search</a></li>
              <li><a href="/About-Us" className="text-muted footer-link">About Us</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
            <p className="text-muted mb-1">Email: support@ecocart.com</p>
            <p className="text-muted">Phone: +91-9876543210</p>
          </div>
        </div>
      </div>

      <div className="text-center py-3 border-top mt-3 text-muted small">
        © {new Date().getFullYear()} Eco-Cart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
