// LeafAnimation.js
import { useState, useEffect, useRef } from 'react';
import './LeafAnimation.css';

const Leaf = ({ imageUrl, position }) => {
  const getPositionStyle = () => {
    switch(position) {
      case 'top-left':
        return { top: '-15px', left: '-15px' };
      case 'top-right':
        return { top: '-15px', right: '-15px' };
      case 'bottom-left':
        return { bottom: '-15px', left: '-15px' };
      case 'bottom-right':
        return { bottom: '-15px', right: '-15px' };
      default:
        return {};
    }
  };

  return (
    <img
      src={imageUrl}
      alt="leaf"
      className="leaf"
      style={getPositionStyle()}
    />
  );
};

const LeafAnimation = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);

  // Default leaf image (replace with your own)
  const leafSVG = './src/assets/leaf.svg';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      className="leaf-container"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
    >
      {children}
      
      <div className={`leaves-wrapper ${(isHovered || isActive) ? 'visible' : ''}`}>
        <Leaf imageUrl={leafSVG} position="top-left" />
        <Leaf imageUrl={'./src/assets/leaf.png'} position="top-right" />
        <Leaf imageUrl={'./src/assets/leaf.png'} position="bottom-left" />
        <Leaf imageUrl={'./src/assets/leaf.png'} position="bottom-right" />
      </div>
    </div>
  );
};

export default LeafAnimation;