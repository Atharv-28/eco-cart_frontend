import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';
import { IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const developers = [
  {
    name: 'Dev A',
    instagram: 'https://instagram.com/dev_a',
    github: 'https://github.com/dev-a',
    linkedin: 'https://linkedin.com/in/dev-a'
  },
  {
    name: 'Dev B',
    instagram: 'https://instagram.com/dev_b',
    github: 'https://github.com/dev-b',
    linkedin: 'https://linkedin.com/in/dev-b'
  },
  {
    name: 'Dev C',
    instagram: 'https://instagram.com/dev_c',
    github: 'https://github.com/dev-c',
    linkedin: 'https://linkedin.com/in/dev-c'
  },
  {
    name: 'Dev D',
    instagram: 'https://instagram.com/dev_d',
    github: 'https://github.com/dev-d',
    linkedin: 'https://linkedin.com/in/dev-d'
  }
];

const Footer = () => {
  return (
    <footer className="footer shadow-sm">
      <div className="container">
        <div className="row align-items-start text-start">
          <div className="col-md-6 mb-4">
            <h5 className="text-success fw-bold">Eco-Cart</h5>
            <p className="text-muted">
              Sustainable choices, smarter living. <br />
              Eco-friendly products for a better tomorrow.
            </p>
            <h6 className="text-uppercase fw-bold mb-3">Developers</h6>
            <div className="d-flex flex-wrap">
              {developers.map((dev, index) => (
                <div key={index} className="me-4 mb-2">
                  <p className="mb-1 fw-semibold">{dev.name}</p>
                  <IconButton href={dev.instagram} target="_blank" size="small">
                    <InstagramIcon sx={{ color: '#E1306C' }} />
                  </IconButton>
                  <IconButton href={dev.linkedin} target="_blank" size="small">
                    <LinkedInIcon sx={{ color: '#0077B5' }} />
                  </IconButton>
                  <IconButton href={dev.github} target="_blank" size="small">
                    <GitHubIcon sx={{ color: '#333' }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6 mb-4 text-md-end">
            <h6 className="text-uppercase fw-bold mb-3">Contact Us</h6>
            <p className="text-muted mb-1">📧 support@ecocart.com</p>
            <p className="text-muted">📞 +91-9876543210</p>
          </div>
        </div>

        <div className="text-center py-3 border-top text-muted small mt-4">
          © {new Date().getFullYear()} Eco-Cart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
