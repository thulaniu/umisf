import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import HeaderPage from "../../HeaderPage/HeaderPage";
import image from "../../../assests/images/gallery/1.jpg"
import image2 from "../../../assests/images/gallery/6.jpg"

import image4 from "../../../assests/images/gallery/4.jpg";

import image6 from "../../../assests/images/gallery/T-2.jpg";
import image7 from "../../../assests/images/gallery/T-3.jpg";
import image8 from "../../../assests/images/gallery/T-5.jpg";
import { Opacity } from "@mui/icons-material";


// Import your background images (replace with your actual image paths)
const backgroundImages = [
  // image,
  // image2,
  // image4,
  
  image6,
  image7,
  image8
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Automatically cycle through background images every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Button styles
  const buttonStyles = {
    padding: '5px 24px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: isHovered ? '#ff6b00' : '#ff8800',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isHovered ? '0 6px 12px rgba(0, 0, 0, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    outline: 'none',
    marginTop: '-7px',
    letterSpacing: '1px',
   
    
  };
  const buttonURl = {
   marginTop: "-7px"
};
  // Container styles for the merchandise section
  const merchandiseContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingBottom: '20px',
    borderRadius: '10px',
    marginTop: '5px',
   
    
    
  };

  // Text styles for the merchandise announcement
  const merchandiseTextStyle = {
    fontSize: '30px',
    color: 'white',
    marginBottom: '10px',
    fontWeight: '500'
  };

  return (
    <div className={styles.homeContainer}>
      {/* Animated Background Slides */}
      <div className={styles.backgroundSlider}>
        {backgroundImages.map((image, index) => (
          <div 
            key={index}
            className={`${styles.backgroundSlide} ${
              index === currentImageIndex ? styles.active : ''
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      <div className={styles.headerDiv}>
        <HeaderPage />
        <div className={styles.UMiSFContainer}>
          
          <h1>UMiSF</h1>
          <p>
            University of Moratuwa<br/>
            International Shuttlers' Fest
          </p>
        </div>
          <div style={merchandiseContainerStyle}>
          <div style={merchandiseTextStyle}>UMiSF 2025 official merchandise</div>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfIU264eXTtGNRB1oJIxO9q-7ayQbPTZUbcuR1HUPCCwSBBcA/viewform" style={buttonURl} target="blank">
          <button 
            style={buttonStyles}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          
            aria-label="Shop UMiSF 2025 merchandise"
          >
            
            BUY NOW 
          </button>
          </a>
        </div>
      
      </div>
    </div>
  );
};

export default HomePage;
