import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const developers = [
  {
    name: 'Atharv Tambekar ',
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
      <div className="container py-4">
        <div className="row d-flex justify-content-between flex-wrap">

          {/* Developer Cards in pairs */}
          <div className="col-lg-7">
            <div className="row">
              {developers.map((dev, idx) => (
                <div className="col-md-6 mb-4" key={idx}>
                  <Card className="developer-card p-3">
                    <CardContent className="text-center">
                      <Typography variant="h6" className="fw-semibold mb-2">{dev.name}</Typography>
                      <Box display="flex" justifyContent="center" gap={1}>
                        <IconButton href={dev.instagram} target="_blank">
                          <InstagramIcon sx={{ color: '#E1306C' }} />
                        </IconButton>
                        <IconButton href={dev.linkedin} target="_blank">
                          <LinkedInIcon sx={{ color: '#0077B5' }} />
                        </IconButton>
                        <IconButton href={dev.github} target="_blank">
                          <GitHubIcon sx={{ color: '#333' }} />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Eco-Cart Info */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <Card className="ecocart-card p-3">
              <CardContent>
                <Typography variant="h5" className="text-success fw-bold mb-2">Eco-Cart</Typography>
                <Typography variant="body2" className="text-muted mb-3">
                  Sustainable choices, smarter living. <br />
                  Eco-friendly products for a better tomorrow.
                </Typography>
                <Typography variant="subtitle1" className="fw-bold mb-1">Contact Us</Typography>
                <Typography variant="body2" className="text-muted mb-1">📧 support@ecocart.com</Typography>
                <Typography variant="body2" className="text-muted">📞 +91-9876543210</Typography>
              </CardContent>
            </Card>
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
