import React from 'react';
import Header from '../Components/Header';
import NotFoundSection from '../Components/NotFoundSection.js';
import Footer from '../Components/Footer.js';
import '../Styles/NotFound.css';

const NotFound = () => {
  return (
    <div>
      <Header page={'NotFound'} />
      <NotFoundSection />
      <Footer />
    </div>
  );
};

export default NotFound;
