import React from 'react';
import Header from '../Components/Header.js';
import HomeSection from '../Components/HomeSection.js';
import Footer from '../Components/Footer.js';
import ReturnTop from '../Components/ReturnTop.js';

const Home = () => {
  return (
    <div>
      <Header page={'Home'} />
      <HomeSection />
      <ReturnTop />
      <Footer />
    </div>
  );
};

export default Home;
