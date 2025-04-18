import React from "react";
import "../styles/AboutUs.css";

function AboutUs() {
  const developers = [
    {
      name: "Athrav Tambekar",
      image: "/images/athrav.jpg", // Adjust paths as needed
    },
    {
      name: "Siddharth Vhatkar",
      image: "/images/siddharth.jpg",
    },
    {
      name: "Harshvardhan Gadagade",
      image: "/images/harshvardhan.jpg",
    },
    {
      name: "Jatin Mail",
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
          <p className="dev-tagline">With passion for the planet 🌍</p>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
