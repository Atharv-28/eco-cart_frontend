import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const developers = [
  {
    name: 'Atharv Tambekar',
    instagram: 'https://www.instagram.com/atharv._.2005/',
    github: 'https://github.com/Atharv-28',
    linkedin: 'https://www.linkedin.com/in/atharv-tambekar/'
  },
  {
    name: 'Siddharth Vhatkar',
    instagram: 'https://www.instagram.com/siddharthvhatkar/',
    github: 'https://github.com/SiddharthThe',
    linkedin: 'https://www.linkedin.com/in/siddharth-vhatkar-08460a282/'
  },
  {
    name: 'Harshvardhan Gadagade',
    instagram: 'https://www.instagram.com/haa.arshh/',
    github: 'https://github.com/HA24RSH',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Jatin Mali',
    instagram: 'https://www.instagram.com/jatin.m03/',
    github: 'https://github.com/WHITEDEVIL333X',
    linkedin: 'https://www.linkedin.com/in/jatin-mali-80b056361/'
  }
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container py-2">
        <div className="row align-items-center">
          {/* Developer Section */}
          <div className="col d-flex justify-content-start">
            <div className="developer-list">
              {developers.map((dev, idx) => (
                <div className="developer-item text-center" key={idx}>
                  <span className="d-block">{dev.name}</span>
                  <div className="developer-icons d-flex justify-content-center gap-2 mt-1">
                    <IconButton href={dev.instagram} target="_blank" size="small" className="icon-link">
                      <InstagramIcon fontSize="small" />
                    </IconButton>
                    <IconButton href={dev.linkedin} target="_blank" size="small" className="icon-link">
                      <LinkedInIcon fontSize="small" />
                    </IconButton>
                    <IconButton href={dev.github} target="_blank" size="small" className="icon-link">
                      <GitHubIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Branding Section */}
          <div className="col-auto text-center">
            <h4 className="eco-cart-branding">Eco-Cart</h4>
          </div>

          {/* Contact Us Section */}
          <div className="col d-flex justify-content-end">
            <div className="contact-us text-end">
              <h5>Contact Us</h5>
              <p>Email: <a href="mailto:support@eco-cart.com">support@eco-cart.com</a></p>
              <p>Phone: <a href="tel:+1234567890">+1 234 567 890</a></p>
            </div>
          </div>
        </div>
        <div className="text-center py-1 border-top text-muted small mt-2">
          © {new Date().getFullYear()} Eco-Cart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;