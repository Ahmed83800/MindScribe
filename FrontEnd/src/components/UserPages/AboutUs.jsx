// src/components/UserPages/AboutUs.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPages.css';
import ahmedImg from '../../assets/Ahmed.jpg';
import laibaImg from '../../assets/Laiba.jpg';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-page">
      {/* Back Arrow */}
      <button className="back-arrow" onClick={() => navigate('/dashboard')}>
        ←
      </button>

      {/* Header */}
      <header className="about-header">
        <h1>About MindScribe</h1>
      </header>

      {/* Intro Content */}
      <div className="about-content">
        <p>
          MindScribe is your personal digital journal that allows you to write, reflect, and grow.
          Whether you're tracking your mood, thoughts, or daily reflections, our platform is here to help.
        </p>
        <p>
          Created with care, MindScribe ensures privacy, simplicity, and a calming space for your thoughts.
        </p>
      </div>

      {/* Founders Section */}
      <div className="founders-section">
        <div className="founder-card">
          <img src={ahmedImg} alt="Ahmed Rehman" className="founder-image" />
          <h2>Ahmed Rehman</h2>
          <h4>Chief Backend Officer</h4>
          <p>
            I lead the development of our backend systems, ensuring secure data handling and smooth
            performance. My drive to support mental health stems from my own experiences with journaling —
            it's powerful, and everyone deserves a safe place to process their emotions.
          </p>
        </div>

        <div className="founder-card">
          <img src={laibaImg} alt="Laiba" className="founder-image" />
          <h2>Laiba</h2>
          <h4>Chief Frontend & Styling</h4>
          <p>
            I design the user interface and style everything users see. My goal is to make the platform feel
            calm and welcoming. Mental health is close to my heart — I believe small, thoughtful design
            choices can create big emotional comfort for those who need it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
