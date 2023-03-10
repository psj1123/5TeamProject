import React from 'react';
import '../Styles/Footer.css';
import FooterLeft from './Footers/FooterLeft';
import FooterCenter from './Footers/FooterCenter';
import FooterRight from './Footers/FooterRight';

const Footer = () => {
  return (
    <footer>
      <div className="footerContainer">
        <div className="footerContainer_1">
          <FooterLeft />
        </div>
        <div className="footerContainer_2">
          <FooterCenter />
        </div>
        <div className="footerContainer_3">
          <FooterRight />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
