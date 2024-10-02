import React from 'react';
import './Home.css';  // Ensure your CSS file is correctly named and located

const Home = () => {
  return (
    <div className="main-content">
      <div className="image-container">
        <div className="text-content">
          <h1>DON'T MISS <br>
          </br>THE JOURNEY <br /> </h1>
          <p>Explore new destinations and feel the excitement with every step.<br/>
           Start your adventure today!</p>
          <button className="shop-button">EXPLORE TRIPS</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
