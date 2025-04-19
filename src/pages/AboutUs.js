import React from "react";
import "../styles/AboutUs.css";

function AboutUs() {
  const developers = [
    {
      name: "Atharv Tambekar",
      image: "https://avatars.githubusercontent.com/u/110536276?v=4",
    },
    {
      name: "Siddharth Vhatkar",
      image: "https://avatars.githubusercontent.com/u/140094131?v=4",
    },
    {
      name: "Harshvardhan Gadagade",
      image: "https://avatars.githubusercontent.com/u/207767043?v=4",
    },
    {
      name: "Jatin Mali",
      image: "/images/jatin.jpg",
    },
  ];

  return (
    <>
      <div className="about-us-container">
        <h1 className="about-title">About Us</h1>
        <p className="about-intro">
          We are a team of eco-conscious individuals dedicated to promoting
          sustainable living through technology.
        </p>

        <section className="mission-vision">
          <div className="section-card">
            <h2>Our Mission</h2>
            <p>
              To empower consumers with reliable eco-product ratings and
              promote sustainable choices through accessible digital tools.
            </p>
          </div>

          <div className="section-card">
            <h2>Our Vision</h2>
            <p>
              A future where eco-friendly living is the norm, and people are
              informed, conscious consumers making a difference every day.
            </p>
          </div>
        </section>

        <div className="developer-info">
          <h2>Developers</h2>
          <div className="developer-list">
            {developers.map((dev, idx) => (
              <a key={idx} href="#footer" className="dev-link dev-card">
                <img src={dev.image} alt={dev.name} className="dev-image" />
                <span className="dev-name">{dev.name}</span>
              </a>
            ))}
          </div>

          <div className="tech-stack">
            <h2>Tech Stack Used</h2>

            {/* Frontend Stack */}
            <div className="tech-category">
              <h3>Frontend</h3>
              <div className="tech-icons">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" title="React" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" title="Bootstrap" />
              </div>
            </div>

            {/* Backend Stack */}
            <div className="tech-category">
              <h3>Backend</h3>
              <div className="tech-icons">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" title="Node.js" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" title="Express" style={{ backgroundColor: "#fff", padding: "5px", borderRadius: "6px" }} />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" title="Python" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" title="Flask" />
              </div>
            </div>
          </div>

          <div className="google-apis">
            <h2>Google Services / APIs</h2>
            <div className="google-api-list">

              <div className="api-card">
                <img src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png" alt="Firebase" />
                <span>Firebase</span>
              </div>

              <div className="api-card">
                <img src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.44.0/files/light/gemini-color.png" alt="Gemini" />
                <span>Gemini</span>
              </div>

              <div className="api-card">
                <img src="https://cdn-icons-png.flaticon.com/128/104/104075.png" alt="Google Custom Search" />
                <span>Custom Search API</span>
              </div>
            </div>
          </div>

          <p className="dev-tagline">With passion for the planet 🌍</p>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
