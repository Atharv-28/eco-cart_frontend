import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { Typography, IconButton, Box } from '@mui/material';
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
  const topRow = developers.slice(0, 2);
  const bottomRow = developers.slice(2);

  return (
    <footer className="footer">
      <div className="container py-3">
        <div className="row justify-content-between">
          {/* Developer Names with Hover Icons in 2 rows */}
          <div className="col-lg-6">
            <div className="developer-list">
              {[topRow, bottomRow].map((group, i) => (
                <div key={i} className="d-flex gap-4 mb-2 flex-wrap">
                  {group.map((dev, idx) => (
                    <div className="developer-item" key={idx}>
                      <span>{dev.name}</span>
                      <div className="developer-icons">
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
              ))}
            </div>
          </div>

          {/* Eco-Cart Info (now inline, no card) */}
          <div className="col-lg-6 mt-4 mt-lg-0">
            <div className="ecocart-info">
              <Typography variant="h6" className="text-success fw-bold mb-2">Eco-Cart</Typography>
              <Typography variant="body2" className="text-muted mb-2">
                Sustainable choices, smarter living.<br />Eco-friendly products for a better tomorrow.
              </Typography>
              <Typography variant="body2" className="text-muted mb-1">📧 support@ecocart.com</Typography>
              <Typography variant="body2" className="text-muted">📞 +91-9876543210</Typography>
            </div>
          </div>
        </div>

        <div className="text-center py-2 border-top text-muted small mt-3">
          © {new Date().getFullYear()} Eco-Cart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;