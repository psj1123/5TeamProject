import React from 'react';
import '../Styles/Footer.css';
import FooterLeft from './Footers/FooterLeft';
import FooterCenter from './Footers/FooterCenter';
import FooterRight from './Footers/FooterRight';

const Footer = () => {
  return (
    <footer>
      <div className="footerContainer">
        <FooterLeft />
        <FooterCenter />
        <FooterRight />
      </div>
    </footer>
  );
};

export default Footer;
