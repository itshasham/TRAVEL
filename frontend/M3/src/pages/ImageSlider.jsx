import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

// Import images directly
import image1 from '../assets/Home_Pictures/1.jpg';
import image2 from '../assets/Home_Pictures/2.jpg';
import image3 from '../assets/Home_Pictures/3.jpg';
import image4 from '../assets/Home_Pictures/4.jpg';
import image5 from '../assets/Home_Pictures/5.jpg';
import image6 from '../assets/Home_Pictures/6.jpg';
import image8 from '../assets/Home_Pictures/8.jpg';
import image9 from '../assets/Home_Pictures/9.jpg';

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image8,
  image9
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">
      <div
        className="slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Move the slides
      >
        {images.map((image, index) => (
          <div className="slide" key={index}>
            <img src={image} alt={`Slide ${index}`} className="slide-image" />
          </div>
        ))}
      </div>
      <button className="prev" onClick={handlePrev}>❮</button>
      <button className="next" onClick={handleNext}>❯</button>
    </div>
  );
};

export default ImageSlider;
